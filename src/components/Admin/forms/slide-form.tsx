"use client";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  SlideFormSchema,
  type SlideFormType,
  createInitialFormState,
  type FormState,
} from "@/lib/form-schema";
import { addSlideAction } from "@/firebase/Create/addSlide";
import { FormStatus } from "@/components/shared/form/form-status";
import { FormSection } from "@/components/shared/form/form-section";
import { FormImageUpload } from "@/components/shared/form/form-image-upload";
import { FormActions } from "@/components/shared/form/form-actions";
import { useModal } from "@/components/shared/modal/modal-provider";
import { SilverPrinceSlide } from "@/lib/types";

interface SlideFormProps {
  values?: Partial<SilverPrinceSlide>;
  onSuccess?: (data: SlideFormType) => void;
}

export function SlideForm({ values, onSuccess }: SlideFormProps) {
  const [formState, setFormState] = useState<FormState<SlideFormType>>(
    createInitialFormState()
  );

  const { closeModal } = useModal();

  // Create form with default values
  const form = useForm<SlideFormType>({
    resolver: zodResolver(SlideFormSchema),
    defaultValues: values,
  });

  // Reset form state when form is reset
  useEffect(() => {
    const subscription = form.watch(() => {
      if (formState.isSuccess) {
        setFormState((prev) => ({ ...prev, isSuccess: false }));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, formState.isSuccess]);

  // Handle form submission
  const onSubmit = async (data: SlideFormType) => {
    setFormState((prev) => ({ ...prev, isSubmitting: true, error: null }));

    try {
      // In a real app, you would use the server action here
      const result = await addSlideAction(data, values?.id);

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
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        data: null,
      });
    }
  };

  return (
    <div>
      {/* Form status message */}
      {(formState.isSuccess || formState.error) && (
        <FormStatus
          status={
            formState.isSuccess ? "success" : formState.error ? "error" : null
          }
          message={
            formState.isSuccess
              ? "Slide created successfully!"
              : formState.error
          }
          className="mb-6"
        />
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload Section */}
          <FormSection
            title="Slide Image"
            description="Upload an image for your carousel slide"
          >
            <FormField
              control={form.control}
              name="banner"
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
          </FormSection>

          {/* Basic Information Section */}
          <FormSection title="Basic Information">
            <div className="gap-4 grid sm:grid-cols-[1fr_0.5fr]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-start">
                    <FormLabel className="h-fit">Slide Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter slide title"
                        {...field}
                        disabled={formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        disabled={formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter slide description"
                      className="min-h-[100px] resize-none"
                      {...field}
                      disabled={formState.isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Note: Only the first line will be visible to users
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.example.com/page"
                      {...field}
                      disabled={formState.isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Where users will go when they click on this slide
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          {/* Form Actions */}
          <FormActions
            isSubmitting={formState.isSubmitting}
            submitText={values ? "Edit Slide" : "Create Slide"}
            submittingText={values ? "Editing Slide..." : "Creating Slide..."}
            showReset={true}
            onCancel={closeModal}
          />
        </form>
      </Form>
    </div>
  );
}
