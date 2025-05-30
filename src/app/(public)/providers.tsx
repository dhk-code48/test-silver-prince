import Navbar from "@/components/App/Navbar/Navbar";
import Footer from "@/components/shared/Footer";
import { Skeleton } from "@/components/ui/skeleton";

import React, { Suspense } from "react";

export default function ChildProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<Skeleton className="w-full h-14" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
