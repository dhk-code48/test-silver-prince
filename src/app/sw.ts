import type { MetadataRoute } from "next";

// This file is used by Next.js to generate the service worker
// The actual service worker logic is handled by the browser and Next.js

export default function sw(): MetadataRoute.Manifest {
  return {
    name: "The Silver Prince Service Worker",
    short_name: "SP SW",
    description: "Service worker for The Silver Prince PWA",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [],
  };
}
