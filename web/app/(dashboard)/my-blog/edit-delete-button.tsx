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
import { Edit } from "lucide-react";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { toast } from "sonner";

interface DeleteBlogButtonProps {
  blogID: string;
}

export function EditDeleteButton({ blogID }: DeleteBlogButtonProps) {
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
      toast.dismiss();
      toast.success("Success", { description: "Blog deleted successfully!" });
      router.refresh();
    },
    onError: (error) => {
      // Show error toast
      toast.dismiss();
      toast.error("Error", {
        description: "An error occurred while deleting blog!",
      });
    },
    onMutate: () => {
      // Show loading toast
      toast.loading("Loading", { description: "Deleting blog..." });
    },
  });

  const handleDelete = async () => {
    mutation.mutate(blogID);
  };

  return (
    <div className="flex flex-row items-center gap-3 self-end">
      {/* Delete Blog */}
      <AlertDialog>
        {/* Trigger */}
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            disabled={mutation.isLoading}
            className="rounded-full px-5 font-bold"
          >
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

      {/* Edit Blog */}
      <Link
        href={`/my-blog/${blogID}`}
        className={
          mutation.isLoading ? "pointer-events-none" : "pointer-events-auto"
        }
      >
        <Button
          variant="purple"
          disabled={mutation.isLoading}
          className="rounded-full px-5 font-bold"
        >
          <Edit className="mr-2 size-5" />
          Edit
        </Button>
      </Link>
    </div>
  );
}
