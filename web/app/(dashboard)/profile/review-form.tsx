"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Ratings from "@/components/ui/rating";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UserReview } from "@/lib/queries/review";
import {
  CreateReviewRequestSchema,
  UpdateReviewRequestSchema,
} from "@/schema/review";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ReviewFormProps {
  isEditing: boolean;
  prevReview: UserReview | null;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ isEditing, prevReview }) => {
  const defaultValues = isEditing
    ? {
        review: prevReview?.review,
        rating: prevReview?.rating,
        isAnonymous: prevReview?.isAnonymous,
      }
    : {
        review: "",
        rating: 0,
        isAnonymous: false,
      };

  const Resolver = isEditing
    ? UpdateReviewRequestSchema
    : CreateReviewRequestSchema;

  const form = useForm<z.infer<typeof Resolver>>({
    resolver: zodResolver(Resolver),
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof Resolver>) => {
    const toastId = toast.loading("Saving Your review...");

    const formData = new FormData();

    formData.append("review", data.review);
    formData.append("rating", data.rating.toString());
    formData.append("isAnonymous", data.isAnonymous.toString());

    const ENDPOINT = isEditing
      ? `/api/review/${prevReview?.id}`
      : "/api/review";

    const METHOD = isEditing ? "PUT" : "POST";
    try {
      const res = await fetch(ENDPOINT, {
        method: METHOD,

        body: formData,
      });
      toast.dismiss(toastId);
      if (!res.ok) {
        const data = await res.json();
        if (data.errorFields) {
          data.errorFields.forEach((field: any) => {
            form.setError(field.field, {
              type: "server",
              message: field.message,
            });
          });
        } else {
          toast.error("Error", {
            description: data.message,
          });
        }
      } else {
        toast.success("Success", {
          description: "Review saved successfully",
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Error", {
        description: "Internal error occured",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center space-y-8 text-center"
      >
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="items-center justify-center">
              <FormLabel className="text-4xl font-bold">
                Leave us a Review
              </FormLabel>
              <FormControl>
                <Ratings
                  size={40}
                  asinput="true"
                  value={field.value}
                  onValueChange={field.onChange}
                  variant="yellow"
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem className="w-[40%]">
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Your Review"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <section className="flex flex-row items-center gap-10">
          <FormField
            control={form.control}
            name="isAnonymous"
            render={({ field }) => (
              <FormItem>
                <section className="flex flex-row items-center justify-center gap-5">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Anonim</FormLabel>
                </section>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Submit
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default ReviewForm;
