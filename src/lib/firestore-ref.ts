import { collection, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const slidesRef = query(
  collection(db, "Slides"),
  orderBy("order", "asc")
);
export const blogsRef = query(
  collection(db, "Blogs"),
  orderBy("createdAt", "desc")
);
