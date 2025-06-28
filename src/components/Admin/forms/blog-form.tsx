"use client";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { BlogFormSchema, BlogFormType, createInitialFormState, FormState } from "@/lib/form-schema";
import { BlogType, SilverPrinceBlog } from "@/lib/types";
import { useActionState, useState } from "react";
import { useModal } from "@/components/shared/modal/modal-provider";
import { addBlogState } from "@/firebase/Create/add-blog";
import { FormStatus } from "@/components/shared/form/form-status";
import { FormActions } from "@/components/shared/form/form-actions";
import { FormSection } from "@/components/shared/form/form-section";
import { FormImageUpload } from "@/components/shared/form/form-image-upload";
import RichTextEditor from "./rich-editor";

const initialState = {
  success: false,
  message: "",
};

interface BlogFormProps {
  values?: Partial<SilverPrinceBlog>;
  onSuccess?: (data: BlogFormType) => void;
}

export function BlogForm(props: BlogFormProps) {
  const { onSuccess, values } = props;
  const { closeModal } = useModal();

  const [formState, setFormState] = useState<FormState<BlogFormType>>(createInitialFormState());

  const form = useForm<BlogFormType>({
    resolver: zodResolver(BlogFormSchema),
    defaultValues: values,
  });

  const onSubmit = async (data: BlogFormType) => {
    setFormState((prev) => ({ ...prev, isSubmitting: true, error: null }));

    try {
      // In a real app, you would use the server action here
      const result = await addBlogState(data, values?.id);

      if (result.success) {
        setFormState({
          isSubmitting: false,
          isSuccess: true,
          error: null,
          data,
        });

        if (onSuccess) {
          onSuccess(data);
        }

        // Optionally reset the form on success
        form.reset();
      } else {
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          error: result.message || "Failed to create slide",
          data: null,
        });

        // Handle field-specific errors if available
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, errors]) => {
            if (errors && errors.length > 0) {
              form.setError(field as any, {
                type: "server",
                message: errors[0],
              });
            }
          });
        }
      }
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred",
        data: null,
      });
    }
  };

  return (
    <div className="w-full">
      {" "}
      {/* Form status message */}
      {(formState.isSuccess || formState.error) && (
        <FormStatus
          status={formState.isSuccess ? "success" : formState.error ? "error" : null}
          message={formState.isSuccess ? "Blog created successfully!" : formState.error}
          className="mb-6"
        />
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload Section */}
          <FormSection title="Banner Image" description="Upload an image for your blog banner">
            <FormField
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormImageUpload value={field.value} onChange={field.onChange} disabled={formState.isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="bannerAlt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Banner Alt</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your blog banner alt text" className="bg-secondary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          <FormSection title="Blog Information">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Blog Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your blog title" type={"text"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter your blog description or caption"
                      className="bg-secondary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Content *</FormLabel>
                  <FormControl>
                    <RichTextEditor onChange={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>
          <FormSection title="SEO Information">
            <FormField
              control={form.control}
              name="seoTitle"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>SEO Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter SEO title" type={"text"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seoDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SEO Description *</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter SEO description" className="bg-secondary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            {/* Image Upload Section */}
            <FormSection title="SEO Image" description="Upload an image for your og banner">
              <FormField
                control={form.control}
                name="ogImage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        disabled={formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ogImageAlt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter SEO Image Alt Text" type={"text"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormSection>
          </FormSection>

          <FormSection title="Blog Display Info">
            <div className="gap-4 grid grid-cols-2">
              <FormField
                control={form.control}
                name="draft"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-1 bg-secondary p-4 border rounded-md">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-primary" />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Save as draft</FormLabel>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 col-span-1 bg-secondary p-4 border rounded-md">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-primary" />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Save as featured blog</FormLabel>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </FormSection>

          {/* Form Actions */}
          <FormActions
            isSubmitting={formState.isSubmitting}
            submitText={values ? "Edit Blog" : "Add Blog"}
            submittingText={values ? "Editing Blog..." : "Adding Blog..."}
            showReset={true}
            onCancel={closeModal}
          />
        </form>
      </Form>
    </div>
  );
}
