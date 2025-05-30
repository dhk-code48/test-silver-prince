"use client";
import { novelProps } from "@/firebase/Read/getNovelData";
import { db } from "@/lib/firebaseConfig";
import { useCollectionQuery } from "@tanstack-query-firebase/react/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const FeaturedNovel = ({ noTitle }: { noTitle?: boolean }) => {
  const { data, error, isLoading } = useCollectionQuery(
    query(collection(db, "Novels"), orderBy("publishedOn", "asc")),
    {
      queryKey: ["Novels"],
    }
  );

  if (data?.empty || !data?.docs)
    return (
      <section className="relative mx-auto py-12 max-w-5xl overflow-hidden container">
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-2xl">Featured Novel</h3>
          </div>
          <div className="flex md:flex-row flex-col gap-8">
            <div className="md:w-1/3">
              <div className="relative shadow-lg rounded-lg aspect-[3/4] overflow-hidden">
                <Skeleton className="size-full" />
              </div>
            </div>
            <div className="md:w-2/3">
              <Skeleton className="mb-2 p-4" />

              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Pokemon",
                  "System",
                  "Reincarnation",
                  "Adventure",
                  "Action",
                  "War",
                  "Conqueror",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 px-2 py-1 rounded-md text-gray-800 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Skeleton className="mb-2 h-10" />

              <div className="flex gap-4">
                <Button asChild className="bg-red-600 hover:bg-red-700">
                  <Link href="#">Read Now</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="#">View Chapters</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );

  const novels: novelProps[] = data?.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      } as novelProps)
  );

  return (
    <>
      {novels && (
        <section className="relative space-y-6 overflow-hidden">
          {!noTitle && <h3 className="font-bold text-2xl">Featured Novel</h3>}

          <div className="flex md:flex-row flex-col gap-8">
            <div className="md:w-1/3">
              <div className="relative shadow-lg rounded-lg aspect-[3/4] overflow-hidden">
                <Image
                  src={novels[0].banner}
                  alt="Pokemon: A Real Story"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="mb-2 font-bold text-2xl">{novels[0].title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "Pokemon",
                  "System",
                  "Reincarnation",
                  "Adventure",
                  "Action",
                  "War",
                  "Conqueror",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-background px-2 py-1 rounded-md text-foreground text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mb-6 text-muted-foreground line-clamp-5">
                {novels[0].synopsis}
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href={`/novel/${novels[0].id}`}>Read Now</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/novel/${novels[0].id}#chapters`}>
                    View Chapters
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FeaturedNovel;
