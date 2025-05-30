"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Linkedin, Search, Github } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { FaDiscord, FaFacebook, FaInstagram, FaPatreon, FaTumblr, FaX, FaXTwitter } from "react-icons/fa6";
import MaxWidthWrapper from "./max-width-wrapper";
import { socialMedia } from "@/lib/constants";
import { useEffect, useState } from "react";
import UserAvatar from "./user-avatar";

export default function Footer() {
  const { isLoggedIn, isLoading, user } = useAuth();
  const path = usePathname();
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!path.includes("/admin")) {
      setShouldRender(true);
    }
  }, [path]);

  if (!shouldRender) return null;

  return (
    <footer className="bg-background border-t text-foreground">
      {/* Main Footer Content */}
      <MaxWidthWrapper className="py-10 container">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Website Info */}
          <div className="space-y-4">
            <h2 className="font-bold text-2xl">TheSilverPrince</h2>
            <p className="max-w-xs text-muted-foreground">
              Rahul Manandhar, pen name The Silver Prince, is a Nepali light novel writer active since 2019. He is best
              known for his novel Pokemon – A Real Story, published on Webnovel, FanFiction.net, and AO3.
            </p>
            <div className="flex space-x-4">
              <Link href={socialMedia.FACEBOOK} className="text-primary transition-colors">
                <FaFacebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href={socialMedia.INSTAGRAM} className="text-primary transition-colors">
                <FaInstagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href={socialMedia.X} className="text-primary transition-colors">
                <FaXTwitter className="w-5 h-5" />
                <span className="sr-only">X (Twitter)</span>
              </Link>
              <Link href={socialMedia.DISCORD} className="text-primary transition-colors">
                <FaDiscord className="w-5 h-5" />
                <span className="sr-only">Discord</span>
              </Link>
              <Link href={socialMedia.PATREON} className="text-primary transition-colors">
                <FaPatreon className="w-5 h-5" />
                <span className="sr-only">Patreon</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/novel" className="hover:text-primary transition-colors">
                  Novels
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-primary transition-colors">
                  Announcements
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-primary transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Search and Login */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary text-lg">Search</h3>
            <div className="flex items-center">
              <Input type="text" placeholder="Search..." className="bg-secondary rounded-r-none focus-visible:ring-0" />
              <Button onClick={() => router.push("/novel")} variant="default" size="icon" className="rounded-l-none">
                <Search className="w-4 h-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
            <div className="pt-2">
              {isLoggedIn ? (
                <>
                  <p>User Profile</p>
                  <Link href={"/novel"}>
                    <UserAvatar displayName={user?.displayName} photoURL={user?.photoURL} />
                  </Link>
                </>
              ) : (
                <Button isLoading={isLoading} asChild>
                  <Link href={"/auth/signin"}>Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Copyright Section */}
      <div className="py-6 border-t border-border text-center">
        <p className="text-muted-foreground text-sm">© {currentYear} Silver Prince. All rights reserved.</p>
      </div>
    </footer>
  );
}
