"use client";

import React, { FC } from "react";

import Head from "next/head";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import FeaturedNovel from "@/components/landing/featured-novel";

const NovelCatalog: FC = () => {
  return (
    <MaxWidthWrapper className="bg-card my-10">
      <div className="bg-card px-10 py-10 rounded-xl">
        <Head>
          <title>Novels | TheSilverPrince</title>
        </Head>
        <FeaturedNovel noTitle />
      </div>
    </MaxWidthWrapper>
  );
};

export default NovelCatalog;
