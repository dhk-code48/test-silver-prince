"use server";

import { db } from "@/lib/firebaseConfig";
import {
  ActionResponse,
  SlideFormSchema,
  SlideFormType,
} from "@/lib/form-schema";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

export const addSlideAction = async (
  data: SlideFormType,
  id?: string
): Promise<ActionResponse> => {
  try {
    const validatedData = SlideFormSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Invalid data",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: data,
      };
    }

    if (id) {
      await updateDoc(doc(db, "Slides", id), {
        ...data,
        updateAt: Timestamp.now(),
      });
    } else {
      await addDoc(collection(db, "Slides"), {
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
