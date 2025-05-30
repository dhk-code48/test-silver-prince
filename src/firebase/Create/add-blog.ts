"use server";

import { db } from "@/lib/firebaseConfig";
import {
  ActionResponse,
  BlogFormSchema,
  BlogFormType,
} from "@/lib/form-schema";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export const addBlogState = async (
  data: BlogFormType,
  id?: string
): Promise<ActionResponse> => {
  try {
    const validatedData = BlogFormSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid data",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: data,
      };
    }

    if (id) {
      const url = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
      await Promise.all([
        updateDoc(doc(db, "Blogs", id), {
          ...data,
          updateAt: Timestamp.now(),
        }),
        fetch(`${url}/api/revalidate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: `/blog/${id}`,
            secret: process.env.NEXT_PUBLIC_REVALIDATION_SECRET,
          }),
        }),
      ]);
    } else {
      await addDoc(collection(db, "Blogs"), {
        ...data,
        createdAt: Timestamp.now(),
      });
    }

    return {
      success: true,
      message: "Data saved",
    };
  } catch (error) {
    return {
      success: false,
      message: "Unexpected Error!",
      inputs: data,
    };
  }
};
