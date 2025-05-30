import React, { useEffect, useState } from "react";
import { novelProps } from "./getNovelData";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

const useNovels = () => {
  const [novels, setNovels] = useState<novelProps[] | null>(null);

  useEffect(() => {
    const ref = query(collection(db, "Novels"), orderBy("publishedOn", "asc"));

    async function getNovels() {
      const docs = await getDocs(ref);
      const novelsData: novelProps[] = [];

      docs.forEach((doc) => {
        const data = doc.data();
        novelsData.push({
          banner: data.banner,
          date: data.publishedOn,
          id: doc.id,
          state: data.state,
          rating: data.rating,
          webLink: data.webLink,
          synopsis: data.synopsis,
          tags: data.tags,
          title: data.title,
        });
      });

      setNovels(novelsData);
    }

    getNovels();
  }, []);

  return novels;
};

export default useNovels;
