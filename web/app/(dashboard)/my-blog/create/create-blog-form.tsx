"use client";

import { PlateEditor } from "@/components/plate-ui/plate-editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CreatePostsSchema } from "@/schema/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Value } from "@udecode/plate-common";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { z } from "zod";

export function CreateBlogForm() {
  // Rich text editor state
  const [editorValue, setEditorValue] = useState<Value>();

  const form = useForm<z.infer<typeof CreatePostsSchema>>({
    resolver: zodResolver(CreatePostsSchema),
    defaultValues: {
      isAnonymous: false,
    },
  });

  const router = useRouter();

  const createNewBlog = async (values: z.infer<typeof CreatePostsSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("previewText", values.previewText);
    formData.append("content", values.content);
    formData.append("isAnonymous", values.isAnonymous.toString());

    const result = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });
    const resJSON = await result.json();

    if (!result.ok) {
      throw new Error(resJSON.message ?? "Failed to create blog!");
    }
  };

  const mutation = useMutation(createNewBlog, {
    onSuccess: () => {
      // Refresh & push to posts page
      toast.dismiss();
      toast.success("Success!", { description: "Blog created successfully" });
      router.push("/my-blog");
      router.refresh();
    },
    onError: (error) => {
      // Show error toast
      toast.dismiss();
      toast.error("Error!", {
        description: "Failed to create blog!",
      });
    },
    onMutate: () => {
      // Show loading toast
      toast.loading("Loading", { description: "Adding blog..." });
    },
  });

  function onSubmit(values: z.infer<typeof CreatePostsSchema>) {
    mutation.mutate(values);
  }

  // Watch editorValue changes
  useEffect(() => {
    if (!editorValue) return;

    // Empty (1 elemetnt but empty text)
    if (editorValue.length === 1 && editorValue[0].children[0].text === "") {
      form.setValue("content", "");
      setEditorValue(undefined);
      return;
    }

    // Stringify editorValue
    const stringifiedValue = JSON.stringify(editorValue);
    form.setValue("content", stringifiedValue);
  }, [form, editorValue]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        {/* Blog Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  disabled={mutation.isLoading}
                />
              </FormControl>
              <FormDescription>Title of your blog post.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preview Text */}
        <FormField
          control={form.control}
          name="previewText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preview Text</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Preview Text"
                  disabled={mutation.isLoading}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Preview text of your blog post. This will be shown in the blog
                card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Is Anonymous */}
        <FormField
          control={form.control}
          name="isAnonymous"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Anonymous</FormLabel>
                <FormDescription>
                  Expose your identity to the public or not.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  disabled={mutation.isLoading}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Edit Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <PlateEditor
                  readOnly={mutation.isLoading}
                  setValue={setEditorValue}
                />
              </FormControl>
              <FormDescription>Content of your blog post.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          variant="green"
          className="self-end w-44 font-bold"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? (
            <>
              <Loader className="animate-spin size-4 mr-2" />
              Loading
            </>
          ) : (
            <>Submit</>
          )}
        </Button>
      </form>
    </Form>
  );
}
