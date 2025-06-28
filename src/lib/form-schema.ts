import * as z from "zod";

export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}

export const SlideFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters long",
    })
    .max(200, {
      message: "Title cannot exceed 200 characters",
    }),
  banner: z.string().url({
    message: "Please provide a valid image URL",
  }),
  description: z
    .string()
    .min(5, {
      message: "Description must be at least 5 characters long",
    })
    .max(500, {
      message: "Description cannot exceed 500 characters",
    }),
  link: z.string().url({
    message: "Please provide a valid URL (include https://)",
  }),
  order: z
    .number()
    .min(0, {
      message: "Order must be a positive number",
    })
    .int({
      message: "Order must be a whole number",
    }),
});

export type SlideFormType = z.infer<typeof SlideFormSchema>;

export const BlogFormSchema = z.object({
  banner: z.string().url({
    message: "Please provide a valid banner URL",
  }),
  bannerAlt: z.string().optional(),
  title: z
    .string({ message: "Blog title is required" })
    .min(5, { message: "Blog title must be more then 5 characters" }),
  description: z.string().optional(),
  content: z
    .string({ message: "Blog content is required" })
    .min(15, { message: "Blog content must be more then 15 characters" }),

  seoTitle: z
    .string({ message: "SEO title is required" })
    .min(5, { message: "SEO title must be more then 5 characters" }),

  seoDescription: z
    .string({ message: "SEO Description is required" })
    .min(15, { message: "SEO Description must be more then 15 characters" }),
  ogImage: z.string().url({
    message: "Please provide a og image URL",
  }),
  ogImageAlt: z.string().optional(),

  draft: z.boolean().default(false).optional(),
  featured: z.boolean().default(false).optional(),
});

export type BlogFormType = z.infer<typeof BlogFormSchema>;

// Generic form state type for reusability
export interface FormState<T> {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  data: T | null;
}

// Generic form state initializer
export const createInitialFormState = <T>(): FormState<T> => ({
  isSubmitting: false,
  isSuccess: false,
  error: null,
  data: null,
});
