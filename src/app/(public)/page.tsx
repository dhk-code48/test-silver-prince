"use client";
import AppSlider from "@/components/App/AppSlider";

import LandingNews from "@/components/landing/landing-news";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Button } from "@/components/ui/button";

import { BookOpen, Clock, Users } from "lucide-react";

import Link from "next/link";

export default function Home() {
  return (
    <MaxWidthWrapper className="space-y-6 md:space-y-24 mt-0 md:mt-5">
      <AppSlider />

      <section className="relative">
        <div className="absolute inset-0 bg-gradient-radial from-primary/50 to-transparent"></div>
        <div className="z-10 relative">
          <div className="flex flex-col items-center mx-auto mb-12 max-w-4xl text-center">
            <div className="relative font-display font-bold">
              <h2 className="mb-4 text-5xl md:text-7xl tracking-wide animate-float">Freedom</h2>
              <h2 className="mb-8 text-5xl md:text-7xl tracking-wide animate-float animation-delay-300">
                From <span className="text-primary italic">Reality</span>
              </h2>
              <div className="-top-8 -left-8 absolute bg-primary/30 rounded-full w-16 h-16 animate-pulse"></div>
              <div className="-right-8 -bottom-8 absolute bg-primary/30 rounded-full w-16 h-16 animate-pulse animation-delay-700"></div>
            </div>
            <p className="z-5 max-w-2xl text-muted-foreground text-xl animate-fade-in animation-delay-500">
              Dive into captivating worlds crafted by passionate writers. Escape reality and embark on extraordinary
              adventures.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in animation-delay-700">
              <Button asChild className="hover:scale-105 transition-transform">
                <Link href="/novel/pokemon-a-real-story">Start Reading</Link>
              </Button>
              <Button asChild variant="outline" className="hover:scale-105 transition-transform">
                <Link href="/about">About the Author</Link>
              </Button>
            </div>
            <div className="gap-8 grid grid-cols-1 md:grid-cols-3 mt-12 w-full">
              <div className="bg-card shadow-md hover:shadow-lg p-6 border border-border rounded-lg transition-all hover:-translate-y-1">
                <div className="flex justify-center items-center bg-primary/30 mx-auto mb-4 rounded-full w-12 h-12">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 font-bold text-lg text-center">Immersive Story</h3>
                <p className="text-muted-foreground text-sm text-center">
                  Experience a realistic take on the Pokemon universe unlike anything you&apos;ve read before.
                </p>
              </div>
              <div className="bg-card shadow-md hover:shadow-lg p-6 border border-border rounded-lg transition-all hover:-translate-y-1">
                <div className="flex justify-center items-center bg-primary/20 mx-auto mb-4 rounded-full w-12 h-12">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 font-bold text-lg text-center">Regular Updates</h3>
                <p className="text-muted-foreground text-sm text-center">
                  New chapters released frequently to keep you engaged in the evolving story.
                </p>
              </div>
              <div className="bg-card shadow-md hover:shadow-lg p-6 border border-border rounded-lg transition-all hover:-translate-y-1">
                <div className="flex justify-center items-center bg-primary/20 mx-auto mb-4 rounded-full w-12 h-12">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2 font-bold text-lg text-center">Community</h3>
                <p className="text-muted-foreground text-sm text-center">
                  Join discussions with other readers and share your thoughts on the latest chapters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <FeaturedNovel /> */}

      <LandingNews />
    </MaxWidthWrapper>
  );
}
