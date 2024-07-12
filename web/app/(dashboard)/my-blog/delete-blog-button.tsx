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

export function DeleteBlogButton() {
  const handleDelete = async () => {
    // Delete blog
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
