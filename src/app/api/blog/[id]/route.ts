import { db } from "@/lib/firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { unstable_cache } from "next/cache";

const CACHE_MAX_AGE = 60 * 60 * 24;

function getBlogFromFirestore(blogId: string) {
  const cachedFetcher = unstable_cache(
    async () => {
      console.log(`Cache miss for blog ${blogId} - fetching from Firestore`);
      const blogRef = doc(collection(db, "Blogs"), blogId);
      const blogSnapshot = await getDoc(blogRef);

      if (!blogSnapshot.exists()) {
        return null;
      }

      const blogData = blogSnapshot.data();
      return {
        ...blogData,
        id: blogSnapshot.id,
        createdAt: blogData.createdAt?.toDate?.() || null,
        updatedAt: blogData.updatedAt?.toDate?.() || null,
      };
    },
    [`blog-${blogId}`],
    {
      revalidate: CACHE_MAX_AGE,
      tags: ["blogs"],
    }
  );

  return cachedFetcher();
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = await getBlogFromFirestore(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const response = NextResponse.json({ data: blog });
    response.headers.set(
      "Cache-Control",
      `public, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate`
    );

    return response;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// Add a revalidation endpoint to clear cache when blog is updated
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { secret } = await request.json();

    // Check for a secret to prevent unauthorized revalidations
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    // Revalidate the specific blog cache tag
    revalidatePath(`/blog/${id}`);
    revalidatePath(`/api/blog/${id}`);

    console.log(`Cache for blog ${id} has been revalidated ===========`);
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: `Cache for blog ${id} has been revalidated`,
    });
  } catch (error) {
    console.error("Error revalidating:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
