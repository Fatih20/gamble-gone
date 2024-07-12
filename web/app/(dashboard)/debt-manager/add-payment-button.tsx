"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { useForm } from "react-hook-form";
import * as z from "zod";

export function AddPaymentButton() {
  const form = useForm<z.infer<typeof AddDebtManagerDataSchema>>({
    resolver: zodResolver(AddDebtManagerDataSchema),
    defaultValues: {
      type: "PAYMENT",
    },
  });

  function onSubmit(values: z.infer<typeof AddDebtManagerDataSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
          {/* Title */}
          <DialogTitle className="font-bold text-xl">
            Add Payment Transaction
          </DialogTitle>

          {/* Form */}
          <Form {...form}>
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
                      />
                    </FormControl>
                    <FormDescription>
                      Amount of payment you want to add.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Note */}
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

              <Button
                type="submit"
                variant="green"
                size="lg"
                className="w-full"
              >
                Submit
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
