"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ChildProvider from "./providers";

const publicClient = new QueryClient();

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={publicClient}>
      <ReactQueryDevtools client={publicClient} />
      <ChildProvider>{children}</ChildProvider>
    </QueryClientProvider>
  );
}
