// Firebase Cloud Messaging Service Worker
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// Initialize Firebase in the service worker
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCV_wozpIUXbmKc-dreOvmz0D1YxXF1PIM",
  authDomain: "the-silver-prince.firebaseapp.com",
  projectId: "the-silver-prince",
  storageBucket: "the-silver-prince.appspot.com",
  messagingSenderId: "682484119735",
  appId: "1:682484119735:web:2cf31463b15660276fb532",
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-72x72.png",
    image: payload.notification.image,
    data: {
      url: payload.data?.url || "/",
      ...payload.data,
    },
    actions: [
      {
        action: "open",
        title: "Read Now",
      },
      {
        action: "close",
        title: "Close",
      },
    ],
    requireInteraction: true,
    vibrate: [200, 100, 200],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "close") {
    return;
  }

  const urlToOpen = event.notification.data.url || "/";

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clientList) => {
        // Check if there's already a window/tab open with the target URL
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }

        // If no window/tab is already open, open a new one
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});
