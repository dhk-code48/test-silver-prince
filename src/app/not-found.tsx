"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, MapPin, Compass, Book } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 min-h-screen">
      <div className="space-y-8 mx-auto max-w-4xl text-center">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="font-bold text-[12rem] text-slate-200 md:text-[16rem] lg:text-[20rem] leading-none select-none">
            404
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="font-bold text-slate-800 text-3xl md:text-4xl lg:text-5xl">Oops! Page Not Found</h1>
            <p className="mx-auto max-w-2xl text-slate-600 text-lg md:text-xl">
              The page you&apos;re looking for seems to have wandered off into the digital wilderness. Don&apos;t worry,
              we&apos;ll help you find your way back home.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/">
                <Home className="mr-2 w-4 h-4" />
                Go Home
              </Link>
            </Button>

            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Go Back
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/contact">
                <Compass className="mr-2 w-4 h-4" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>

        {/* Popular Pages */}
        <div className="mt-12">
          <h2 className="mb-6 font-semibold text-slate-700 text-xl">Popular Pages</h2>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <Link href="/" className="block">
                  <div className="space-y-2 text-center">
                    <div className="flex justify-center items-center bg-blue-100 mx-auto rounded-lg w-12 h-12">
                      <Home className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-slate-800">Home</h3>
                    <p className="text-slate-600 text-sm">Return to homepage</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <Link href="/about" className="block">
                  <div className="space-y-2 text-center">
                    <div className="flex justify-center items-center bg-green-100 mx-auto rounded-lg w-12 h-12">
                      <Compass className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-medium text-slate-800">About</h3>
                    <p className="text-slate-600 text-sm">Learn more about us</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <Link href="/novel" className="block">
                  <div className="space-y-2 text-center">
                    <div className="flex justify-center items-center bg-purple-100 mx-auto rounded-lg w-12 h-12">
                      <Book className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-slate-800">Novel</h3>
                    <p className="text-slate-600 text-sm">Explore our Novel</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <Link href="/contact" className="block">
                  <div className="space-y-2 text-center">
                    <div className="flex justify-center items-center bg-orange-100 mx-auto rounded-lg w-12 h-12">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-medium text-slate-800">Contact</h3>
                    <p className="text-slate-600 text-sm">Get in touch</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-slate-200 border-t">
          <p className="text-slate-500 text-sm">
            Error Code: 404 | If you believe this is a mistake, please{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
