import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Pokemon Novel - A Real Story | TheSilverPrince";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "linear-gradient(to bottom, #000428, #004e92)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          padding: "40px",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: "bold" }}>Pokemon Novel</div>
        <div style={{ fontSize: 32, marginTop: 20 }}>
          A Real Story | TheSilverPrince
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
