import { getToken, onMessage } from "firebase/messaging";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "./firebaseConfig";

export class NotificationService {
  private messaging: any = null;

  async initialize() {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      try {
        // First register our main service worker
        await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        // Create Firebase messaging service worker content dynamically
        await this.createFirebaseServiceWorker();

        // Register Firebase messaging service worker
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
          scope: "/firebase-cloud-messaging-push-scope",
          updateViaCache: "none",
        });

        console.log("Firebase Service Worker registered:", registration);

        // Initialize Firebase Messaging
        const { getMessaging } = await import("firebase/messaging");
        this.messaging = getMessaging();

        return true;
      } catch (error) {
        console.error("Service Worker registration failed:", error);
        return false;
      }
    }
    return false;
  }

  private async createFirebaseServiceWorker() {
    // Create the Firebase service worker with actual config values
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const swContent = `
// Firebase Cloud Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp(${JSON.stringify(firebaseConfig)});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    image: payload.notification.image,
    data: {
      url: payload.data?.url || '/',
      ...payload.data
    },
    actions: [
      {
        action: 'open',
        title: 'Read Now'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ],
    requireInteraction: true,
    vibrate: [200, 100, 200]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  const urlToOpen = event.notification.data.url || '/';

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
`;

    // Write the service worker file
    try {
      const response = await fetch("/api/create-sw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: swContent }),
      });

      if (!response.ok) {
        console.warn("Could not create dynamic service worker, using static version");
      }
    } catch (error) {
      console.warn("Could not create dynamic service worker, using static version");
    }
  }

  async requestPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === "granted";
  }

  async getToken(): Promise<string | null> {
    if (!this.messaging) {
      const initialized = await this.initialize();
      if (!initialized) {
        throw new Error("Failed to initialize messaging service");
      }
    }

    try {
      const token = await getToken(this.messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: await navigator.serviceWorker.getRegistration(
          "/firebase-cloud-messaging-push-scope"
        ),
      });
      return token;
    } catch (error) {
      console.error("Error getting FCM token:", error);
      return null;
    }
  }

  async subscribeToNotifications(userId: string): Promise<boolean> {
    try {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        throw new Error("Notification permission denied");
      }

      const token = await this.getToken();
      if (!token) {
        throw new Error("Failed to get FCM token");
      }

      // Save token to user document
      const userRef = doc(db, "Users", userId);
      await updateDoc(userRef, {
        fcmTokens: arrayUnion(token),
        notificationsEnabled: true,
        lastTokenUpdate: new Date(),
      });

      // Set up foreground message listener
      if (this.messaging) {
        onMessage(this.messaging, (payload) => {
          console.log("Foreground message received:", payload);
          this.showLocalNotification(payload);
        });
      }

      return true;
    } catch (error) {
      console.error("Error subscribing to notifications:", error);
      return false;
    }
  }

  async unsubscribeFromNotifications(userId: string): Promise<boolean> {
    try {
      const token = await this.getToken();
      if (token) {
        const userRef = doc(db, "Users", userId);
        await updateDoc(userRef, {
          fcmTokens: arrayRemove(token),
          notificationsEnabled: false,
        });
      }
      return true;
    } catch (error) {
      console.error("Error unsubscribing from notifications:", error);
      return false;
    }
  }

  private showLocalNotification(payload: any) {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(payload.notification.title, {
          body: payload.notification.body,
          icon: "/icons/icon-192x192.png",
          badge: "/icons/icon-72x72.png",
          data: payload.data,
        });
      });
    }
  }

  async updateNotificationPreferences(
    userId: string,
    preferences: {
      newChapters: boolean;
      announcements: boolean;
      comments: boolean;
    }
  ) {
    try {
      const userRef = doc(db, "Users", userId);
      await updateDoc(userRef, {
        notificationPreferences: preferences,
      });
      return true;
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      return false;
    }
  }
}

export const notificationService = new NotificationService();
