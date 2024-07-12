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
import { AddDebtManagerDataSchema } from "@/schema/debt";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface AddPaymentButtonProps {
  id: string;
}

export function AddPaymentButton({ id }: AddPaymentButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof AddDebtManagerDataSchema>>({
    resolver: zodResolver(AddDebtManagerDataSchema),
    defaultValues: {
      type: "payment",
      amount: 0,
      note:""
    },
  });

  async function onSubmit(values: z.infer<typeof AddDebtManagerDataSchema>) {
    const toastId = toast.loading("Submitting payment...");
    const formData = new FormData();
    formData.append("amount", values.amount.toString());
    formData.append("type", values.type);
    formData.append("note", values.note);

    try {
      const res = await fetch(`/api/debt/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to submit payment");
      }

      toast.success("Payment submitted successfully", { id: toastId });
      form.reset();
    } catch (error) {
      toast.error("Error submitting payment", { id: toastId });
    }
    if (ref.current) {
      
      ref.current.click();
    }
    router.refresh();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="green"
          className="rounded-full w-36 font-bold"
          size="lg"
        >
          Add Payment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            Add Payment Transaction
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    Amount of payment you want to add.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input placeholder="Note" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    Note for the payment transaction.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <section className="flex flex-row gap-10 items-center justify-center">
              <DialogClose asChild>
                <Button ref={ref} type="button" size="lg" className="hidden">
                  Close
                </Button>
              </DialogClose>

              <Button
                type="submit"
                variant="green"
                size="lg"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                Submit
              </Button>
            </section>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
