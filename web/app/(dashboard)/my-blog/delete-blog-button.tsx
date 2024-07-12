"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { toast } from "sonner";

interface DeleteBlogButtonProps {
  blogID: string;
}

export function DeleteBlogButton({ blogID }: DeleteBlogButtonProps) {
  const router = useRouter();

  const deleteBlog = async (blogID: string) => {
    const result = await fetch(`/api/posts/${blogID}`, {
      method: "DELETE",
    });
    const resJSON = await result.json();

    if (!result.ok) {
      throw new Error(resJSON.message ?? "Failed to delete blog!");
    }
  };

  const mutation = useMutation(deleteBlog, {
    onSuccess: () => {
      // Refresh
      toast.success("Success", { description: "Blog deleted successfully!" });
      router.refresh();
    },
    onError: (error) => {
      // Show error toast
      toast.error("Error", {
        description: String(error) ?? "An error occurred while deleting blog!",
      });
    },
  });

  const handleDelete = async () => {
    mutation.mutate(blogID);
  };

  return (
    <AlertDialog>
      {/* Trigger */}
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="rounded-full px-5 font-bold">
          <TrashIcon className="mr-2 size-5" />
          Delete
        </Button>
      </AlertDialogTrigger>

      {/* Content */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Delete</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Apakah Anda yakin ingin menghapus blog ini? Tindakan ini tidak dapat
          diurungkan.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full px-5 font-semibold">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            variant="destructive"
            className="rounded-full px-5 font-semibold"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
