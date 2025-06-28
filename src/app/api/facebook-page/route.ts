import { type NextRequest, NextResponse } from "next/server";

// You'll need to get these from Facebook Developer Console
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");

  if (!pageId) {
    return NextResponse.json({ error: "Page ID is required" }, { status: 400 });
  }

  try {
    // Method 1: Using App Access Token (App ID + App Secret)
    const appAccessToken = `${FACEBOOK_APP_ID}|${FACEBOOK_APP_SECRET}`;

    // Method 2: Using Page Access Token (if you have one)
    const accessToken = FACEBOOK_ACCESS_TOKEN || appAccessToken;

    const fields = [
      "name",
      "about",
      "description",
      "fan_count",
      "followers_count",
      "picture.type(large)",
      "cover",
      "verification_status",
      "link",
    ].join(",");

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}?fields=${fields}&access_token=${accessToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Cache for 1 hour
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Facebook API Error:", errorData);
      throw new Error(`Facebook API error: ${response.status}`);
    }

    const data = await response.json();

    // Format the data for your component
    const formattedData = {
      name: data.name || "The Silver Prince",
      followers: formatNumber(data.followers_count || data.fan_count || 0),
      likes: formatNumber(data.fan_count || 0),
      description:
        data.about ||
        data.description ||
        "Nepali light novel writer • Pokemon - A Real Story author • Active since 2019",
      profileImage: data.picture?.data?.url || "/placeholder.svg?height=80&width=80",
      coverImage: data.cover?.source || "/placeholder.svg?height=120&width=300",
      isVerified: data.verification_status === "blue_verified" || data.verification_status === "gray_verified",
      link: data.link,
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching Facebook page data:", error);

    // Return fallback data instead of error
    return NextResponse.json({
      name: "The Silver Prince",
      followers: "1.2K+",
      likes: "1.1K+",
      description: "Nepali light novel writer • Pokemon - A Real Story author • Active since 2019",
      profileImage: "/placeholder.svg?height=80&width=80",
      coverImage: "/placeholder.svg?height=120&width=300",
      isVerified: false,
    });
  }
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}
