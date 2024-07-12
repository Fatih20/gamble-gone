"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { CreateInitialDebtSchema } from "@/schema/debt";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const NoDebtModal = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof CreateInitialDebtSchema>>({
    resolver: zodResolver(CreateInitialDebtSchema),
    mode: "onBlur",
    defaultValues: {
      amount: 0,
      debtName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateInitialDebtSchema>) => {
    const toastId = toast.loading("Submitting debt...");
    const formData = new FormData();
    formData.append("amount", data.amount.toString());
    formData.append("debtName", data.debtName);

    try {
      const res = await fetch("/api/debt", {
        method: "POST",
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
          toast.error("Error", {
            description: "Validation error",
          });
        } else {
          toast.error("Error", {
            description: data.message,
          });
        }
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Update profile error", {
        description: "Failed to update profile",
      });
    }
    if (ref.current) {
      ref.current.click();
    }
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="white"
          className="rounded-full w-36 font-bold text-center"
          size="lg"
        >
          Register Debt
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {/* Title */}
          <DialogTitle className="font-bold text-xl">Add New Debt</DialogTitle>

          {/* Form */}
          <Form {...form}>
            {/* debt name */}
            <FormField
              control={form.control}
              name="debtName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Debt Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Note" type="text" {...field} />
                  </FormControl>
                  <FormDescription>What is this debt for </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Transaction amount"
                        type="number"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormDescription>Amount of your debt</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="green"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="w-full"
              >
                Submit
              </Button>
            </form>
          </Form>
        </DialogHeader>
        <DialogClose asChild>
          <Button ref={ref} type="button" size="lg" className="hidden">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default NoDebtModal;
