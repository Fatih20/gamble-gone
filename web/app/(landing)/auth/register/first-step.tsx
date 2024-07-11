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
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { P } from "@/components/ui/typography";
import { SignUpRequestSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface FirstStepProps {
  onSuccess: (data: { username: string; password: string }) => void;
}

const FirstStep: React.FC<FirstStepProps> = ({ onSuccess }) => {
  const form = useForm<z.infer<typeof SignUpRequestSchema>>({
    resolver: zodResolver(SignUpRequestSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof SignUpRequestSchema>) => {
    const { username, password } = data;

    const formData = new FormData();

    formData.append("username", username);
    // Here, check if the username exists in your database
    const res = await fetch(`/api/auth/sign-up/${username}`);
    try {
      if (!res.ok) {
        const json = await res.json();
        if (json.errorFields) {
          json.errorFields.forEach((field: any) => {
            form.setError(field.field, {
              type: "server",
              message: field.message,
            });
          });
        } else {
          toast.error("Error", {
            description: json.message,
          });
        }
      } else {
        onSuccess({ username, password });
      }
    } catch (error) {
      toast.error("Error", {
        description: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-10 flex w-[50%] flex-col items-center justify-center gap-10 text-start"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Your Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Input a strong password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirmation Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Re-enter Your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="green"
            size="lg"
            type="submit"
            className="mb-3 font-bold"
            disabled={form.formState.isSubmitting}
          >
            Register
          </Button>
          <P level={"sm"}>
            Already have an Account?{" "}
            <Link href="/auth/login" className="font-bold">
              Login Now!
            </Link>
          </P>
        </form>
      </Form>
    </div>
  );
};

export default FirstStep;
