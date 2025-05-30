import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

export interface slidesProps {
  banner: string;
  link: string;
  title: string;
  label: string;
  order: number;
}

const useSlides = () => {
  const [slides, setSlides] = useState<slidesProps[] | null>(null);

  useEffect(() => {
    const ref = query(collection(db, "Slides"), orderBy("order", "asc"));

    async function getSides() {
      const docs = await getDocs(ref);
      const slidesData: slidesProps[] = [];

      docs.forEach((doc) => {
        const data = doc.data() as slidesProps;
        slidesData.push(data);
      });

      setSlides(slidesData);
    }

    getSides();
  }, []);

  return slides;
};

export default useSlides;
