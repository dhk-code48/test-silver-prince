import { Timestamp } from "firebase/firestore";

export type SilverPrinceSlide = {
  id: string;
  banner: string;
  link: string;
  title: string;
  description: string;
  order: number;

  createdAt: Timestamp;
  updatedAt: Timestamp;
};

//  ------ BLOG -------- //
export type BlogSEO = {
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
};

export interface BlogType extends BlogSEO {
  title: string;
  description: string;
  content: string;
  banner: string;

  draft: boolean;
  featured: boolean;
}

export interface SilverPrinceBlog extends BlogType {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
