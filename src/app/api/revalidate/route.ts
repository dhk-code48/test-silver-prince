import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const { path, tag, secret } = await request.json();

    // Check for a secret to prevent unauthorized revalidations
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    if (path) {
      console.log(" ===== REVALIDATING ===== ");
      // Revalidate the specified path
      revalidatePath(path);
      return NextResponse.json({
        revalidated: true,
        path,
        timestamp: new Date().toISOString(),
      });
    } else if (tag) {
      // Revalidate by tag
      revalidateTag(tag);
      return NextResponse.json({
        revalidated: true,
        tag,
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json(
        { error: "Path or tag is required" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error revalidating:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
