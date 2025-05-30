"use client";

import { Suspense, use } from "react";
import Novel from "./_components/client";
import NovelLoading from "./loading";

interface pageProps {
  params: Promise<{ id: string }>;
}
export default function NovelPage(props: pageProps) {
  const params = use(props.params);

  return (
    <Suspense fallback={<NovelLoading />}>
      <Novel params={params} />
    </Suspense>
  );
}
