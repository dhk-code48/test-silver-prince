"use client";
import AddSlide from "@/components/Admin/AddSlide";

import React, { useMemo } from "react";
import {
  useCollectionQuery,
  useDocumentQuery,
} from "@tanstack-query-firebase/react/firestore";
import { db } from "@/lib/firebaseConfig";
import { slidesRef } from "@/lib/firestore-ref";
import { slidesProps } from "@/firebase/Read/getSlides";
import { SilverPrinceSlide } from "@/lib/types";
import { SlideCard } from "@/components/Admin/SlideCard";
import { AdminEmptyState } from "@/components/Admin/EmptyState";
import { AdminLoadingState } from "@/components/Admin/LoadingState";
import { AdminErrorState } from "@/components/Admin/ErrorState";

const AdminSlidePage = () => {
  const { data, isLoading, isError, error, refetch } = useCollectionQuery(
    slidesRef,
    {
      queryKey: ["slides"],
    }
  );

  const slides: SilverPrinceSlide[] = useMemo(
    () =>
      data?.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as SilverPrinceSlide)
      ) || [],
    [data?.docs]
  );

  if (isError) {
    return (
      <AdminErrorState
        title="Error Loading Slides"
        description="We encountered a problem while fetching your carousel slides"
        error={error}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="mx-auto px-4 py-8 container">
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Carousel Slides</h1>
          <p className="mt-1 text-muted-foreground">
            Manage the slides that appear on your website homepage carousel.
          </p>
        </div>
        <AddSlide afterSubmit={() => refetch()} order={slides.length + 1} />
      </div>

      {isLoading || !data ? (
        <AdminLoadingState
          title="Loading Carousel Slides"
          description="Please wait while we fetch your carousel slides"
          loadingMessage="Retrieving slides from the database..."
        />
      ) : data.empty ? (
        <AdminEmptyState
          title="No Slides Found"
          description="You haven't created any carousel slides yet."
          actionLabel="Add Your First Slide"
          onAction={() => document.getElementById("add-slide-button")?.click()}
        />
      ) : (
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {slides.map((slide) => (
            <SlideCard
              key={slide.id}
              slide={slide}
              onRefetch={() => refetch()}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSlidePage;
