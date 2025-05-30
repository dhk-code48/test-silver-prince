"use client";

import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/Admin/admin-sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/shared/protected-route";

const adminClient = new QueryClient();

const AdminPageLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, user, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) router.push("/novel");

    if (!isLoading && user) {
      if (
        user.uid !== process.env.NEXT_PUBLIC_KEY1 &&
        user.uid !== process.env.NEXT_PUBLIC_KEY2 &&
        user.uid !== process.env.NEXT_PUBLIC_KEY3
      ) {
        router.push("/novel");
      }
    }
  }, [user, isLoading, router, isLoggedIn]);

  return (
    <ProtectedRoute requireEmailVerification>
      <QueryClientProvider client={adminClient}>
        <SidebarProvider>
          <AdminSidebar />
          <main className="w-full">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
        <ReactQueryDevtools client={adminClient} />
      </QueryClientProvider>
    </ProtectedRoute>
  );
};

export default AdminPageLayout;
