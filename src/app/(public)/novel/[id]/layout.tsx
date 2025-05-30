import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Read Pokemon - A Real Story | TheSilverPrince",
  description:
    "There is a substantial gap between the storyline of anime and the realistic narrative of Pokémon. This light novel aims to bridge that gap, providing viewers with a believable and thrilling adventure-packed story. Follow our protagonist, Axel Blaze, a reincarnated individual, who, armed with knowledge from the previous Pokémon world, aspires to achieve world domination.",
  keywords: "Pokemon, System, Reincarnation, Adventure, Action, War, Conqueror",
  openGraph: {
    title: "Read Pokemon - A Real Story | TheSilverPrince",
    description:
      "There is a substantial gap between the storyline of anime and the realistic narrative of Pokémon. This light novel aims to bridge that gap, providing viewers with a believable and thrilling adventure-packed story.",
    images: [
      {
        url: "/images/novel-og.jpg",
        width: 1200,
        height: 630,
        alt: "Pokemon Novel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Read Pokemon - A Real Story | TheSilverPrince",
    description:
      "There is a substantial gap between the storyline of anime and the realistic narrative of Pokémon.",
    images: ["/images/novel-og.jpg"],
  },
};

export default function NovelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
