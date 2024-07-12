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
import { type Posts } from "@/types/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Value } from "@udecode/plate-common";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EditBlogFormProps {
  initialValue: Posts;
}

export function EditBlogForm({ initialValue }: EditBlogFormProps) {
  // Rich text editor state
  const [editorValue, setEditorValue] = useState<Value>(initialValue.content);

  const form = useForm<z.infer<typeof CreatePostsSchema>>({
    resolver: zodResolver(CreatePostsSchema),
    defaultValues: {
      title: initialValue.title,
      previewText: initialValue.previewText,
      isAnonymous: initialValue.createdBy == null,
      content: JSON.stringify(initialValue.content),
    },
  });

  function onSubmit(values: z.infer<typeof CreatePostsSchema>) {
    // Parse value into array
    console.log(values);
  }

  // Watch editorValue changes
  useEffect(() => {
    // Empty (1 elemetnt but empty text)
    const isEmpty = editorValue.every((v) => v.children[0].text === "");

    if (isEmpty) {
      return form.setValue("content", "");
    } else {
      // Stringify editorValue
      const stringifiedValue = JSON.stringify(editorValue);
      form.setValue("content", stringifiedValue);
    }
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
                <Input placeholder="Title" {...field} />
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
                <Textarea placeholder="Preview Text" {...field} />
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
            <FormItem className="flex w-fit flex-row items-center justify-between gap-4 rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Anonymous</FormLabel>
                <FormDescription>
                  Expose your identity to the public or not.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
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
                <>
                  <PlateEditor
                    setValue={setEditorValue}
                    initialValue={initialValue.content}
                  />
                </>
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
          className="self-end px-16 font-bold"
        >
          Update
        </Button>
      </form>
    </Form>
  );
}
