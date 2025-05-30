import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Merriweather, Poppins, Rubik } from "next/font/google";
import localFont from "next/font/local";
export const fontSans: NextFontWithVariable = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const fontRubik: NextFontWithVariable = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const fontSerif: NextFontWithVariable = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "700", "900"],
  style: "normal",
});

export const fontDisplay = localFont({
  src: [
    { path: "../assets/Junicode.ttf", weight: "400" },
    { path: "../assets/Junicode-Bold.ttf", weight: "700" },
    { path: "../assets/Junicode-Italic.ttf", style: "italic", weight: "400" },
    { path: "../assets/Junicode-BoldItalic.ttf", style: "italic", weight: "700" },
  ],
  variable: "--font-display",
});
