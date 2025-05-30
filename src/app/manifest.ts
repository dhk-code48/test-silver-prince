import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Silver Prince",
    short_name: "Silver Prince",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    orientation: "portrait-primary",
    categories: ["books", "entertainment", "lifestyle", "pokemon"],
    lang: "en",
    dir: "ltr",

    description:
      "Rahul Manandhar (Pen name: The Silver Prince) was born in Nepal. He is a light novel writer and has been writing since 2019. He is famous for his novel ‘Pokemon- a real story’ which has been published in webnovels, Fanfiction.net and AO3.",
    start_url: "/",
  };
}
