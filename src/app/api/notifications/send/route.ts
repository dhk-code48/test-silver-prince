import { type NextRequest, NextResponse } from "next/server";
import { messaging } from "@/lib/firebase-admin";
import { db } from "@/lib/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const { title, body, url, image, targetUsers, notificationType } = await request.json();

    // Validate required fields
    if (!title || !body) {
      return NextResponse.json({ error: "Title and body are required" }, { status: 400 });
    }

    let tokens: string[] = [];

    if (targetUsers === "all") {
      // Get all users with notifications enabled
      const usersQuery = query(collection(db, "Users"));
      const usersSnapshot = await getDocs(usersQuery);

      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.fcmTokens && Array.isArray(userData.fcmTokens)) {
          tokens.push(...userData.fcmTokens);
        }
      });
    } else if (targetUsers === "chapter-subscribers") {
      // Get users who want chapter notifications
      const usersQuery = query(
        collection(db, "Users"),
        where("notificationsEnabled", "==", true),
        where("notificationPreferences.newChapters", "==", true)
      );
      const usersSnapshot = await getDocs(usersQuery);

      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.fcmTokens && Array.isArray(userData.fcmTokens)) {
          tokens.push(...userData.fcmTokens);
        }
      });
    } else if (Array.isArray(targetUsers)) {
      // Specific user IDs
      for (const userId of targetUsers) {
        const userQuery = query(
          collection(db, "Users"),
          where("uid", "==", userId),
          where("notificationsEnabled", "==", true)
        );
        const userSnapshot = await getDocs(userQuery);

        userSnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.fcmTokens && Array.isArray(userData.fcmTokens)) {
            tokens.push(...userData.fcmTokens);
          }
        });
      }
    }

    // Remove duplicates
    tokens = [...new Set(tokens)];

    if (tokens.length === 0) {
      return NextResponse.json({ message: "No valid tokens found", sentCount: 0 });
    }

    // Prepare the message
    const message = {
      notification: {
        title,
        body,
        ...(image && { image }),
      },
      data: {
        url: url || "/",
        type: notificationType || "general",
        timestamp: Date.now().toString(),
      },
      webpush: {
        fcmOptions: {
          link: url || "/",
        },
        notification: {
          icon: "/icons/icon-192x192.png",
          badge: "/icons/icon-72x72.png",
          requireInteraction: true,
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
        },
      },
    };

    // Send notifications in batches (FCM allows max 500 tokens per request)
    const batchSize = 500;
    const results = [];

    for (let i = 0; i < tokens.length; i += batchSize) {
      const batch = tokens.slice(i, i + batchSize);

      try {
        const response = await messaging.sendEachForMulticast({
          tokens: batch,
          ...message,
        });

        results.push(response);
      } catch (error) {
        console.error("Error sending batch:", error);
      }
    }

    // Calculate total success count
    const totalSent = results.reduce((sum, result) => sum + result.successCount, 0);
    const totalFailed = results.reduce((sum, result) => sum + result.failureCount, 0);

    return NextResponse.json({
      message: "Notifications sent",
      sentCount: totalSent,
      failedCount: totalFailed,
      totalTokens: tokens.length,
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
    return NextResponse.json({ error: "Failed to send notifications" }, { status: 500 });
  }
}
