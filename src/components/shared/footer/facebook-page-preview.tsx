"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Heart } from "lucide-react";
import { FaFacebook } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

interface FacebookPageData {
  name: string;
  followers: string;
  likes: string;
  description: string;
  profileImage: string;
  coverImage: string;
  isVerified?: boolean;
}

export default function FacebookPagePreview() {
  const [pageData, setPageData] = useState<FacebookPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Your Facebook page ID (extract from your URL)
  const pageId = "61576248986232";
  const facebookPageUrl = "https://www.facebook.com/people/The-Silver-Prince/61576248986232/";

  useEffect(() => {
    const fetchFacebookPageData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Method 1: Using your own API route (recommended)
        const response = await fetch(`/api/facebook-page?pageId=${pageId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch page data");
        }

        const data = await response.json();
        setPageData(data);
      } catch (err) {
        console.error("Error fetching Facebook page data:", err);
        setError(err instanceof Error ? err.message : "Failed to load page data");

        // Fallback to static data
        setPageData({
          name: "The Silver Prince",
          followers: "1.2K+",
          likes: "1.1K+",
          description: "Nepali light novel writer • Pokemon - A Real Story author • Active since 2019",
          profileImage: "/placeholder.svg?height=80&width=80",
          coverImage: "/placeholder.svg?height=120&width=300",
          isVerified: false,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacebookPageData();
  }, [pageId]);

  if (isLoading) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="p-4">
          <div className="space-y-3 animate-pulse">
            <div className="bg-muted rounded w-full h-20"></div>
            <div className="flex items-center space-x-3">
              <div className="bg-muted rounded-full w-12 h-12"></div>
              <div className="flex-1 space-y-2">
                <div className="bg-muted rounded w-3/4 h-4"></div>
                <div className="bg-muted rounded w-1/2 h-3"></div>
              </div>
            </div>
            <div className="bg-muted rounded w-full h-3"></div>
            <div className="bg-muted rounded w-full h-8"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !pageData) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="p-4">
          <div className="space-y-3 text-center">
            <FaFacebook className="mx-auto w-12 h-12 text-blue-600" />
            <div>
              <h4 className="font-semibold">The Silver Prince</h4>
              <p className="text-muted-foreground text-sm">Follow us on Facebook</p>
              {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
            </div>
            <Link href={facebookPageUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                <FaFacebook className="mr-2 w-4 h-4" />
                Visit Page
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardContent className="p-0">
        {/* Cover Image */}
        <div
          className="relative bg-gradient-to-r from-blue-600 to-purple-600 h-20"
          style={{
            backgroundImage:
              pageData.coverImage !== "/placeholder.svg?height=120&width=300"
                ? `url(${pageData.coverImage})`
                : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="space-y-3 p-4">
          {/* Profile Section */}
          <div className="relative flex items-center space-x-3 -mt-8">
            <div className="bg-white p-1 rounded-full">
              {pageData.profileImage !== "/placeholder.svg?height=80&width=80" ? (
                <Image
                  src={pageData.profileImage || "/placeholder.svg"}
                  alt={pageData.name}
                  width={500}
                  height={500}
                  className="rounded-full w-12 h-12 object-cover"
                />
              ) : (
                <div className="flex justify-center items-center bg-blue-600 rounded-full w-12 h-12">
                  <FaFacebook className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
            <div className="pt-6">
              <div className="flex items-center gap-1">
                <h4 className="font-semibold text-sm">{pageData.name}</h4>
                {pageData.isVerified && (
                  <div className="flex justify-center items-center bg-blue-600 rounded-full w-3 h-3">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground text-xs">Facebook Page</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between text-center">
            <div>
              <div className="flex justify-center items-center gap-1">
                <Users className="w-3 h-3 text-muted-foreground" />
                <span className="font-semibold text-sm">{pageData.followers}</span>
              </div>
              <p className="text-muted-foreground text-xs">Followers</p>
            </div>
            <div>
              <div className="flex justify-center items-center gap-1">
                <Heart className="w-3 h-3 text-muted-foreground" />
                <span className="font-semibold text-sm">{pageData.likes}</span>
              </div>
              <p className="text-muted-foreground text-xs">Likes</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">{pageData.description}</p>

          {/* Follow Button */}
          <Link href={facebookPageUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-blue-600 hover:bg-blue-700 w-full text-sm">
              <FaFacebook className="mr-2 w-4 h-4" />
              Follow Page
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
