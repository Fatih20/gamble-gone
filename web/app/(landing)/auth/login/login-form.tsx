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
import { SignInRequestSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const LoginForm = () => {
  const form = useForm<z.infer<typeof SignInRequestSchema>>({
    resolver: zodResolver(SignInRequestSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof SignInRequestSchema>) => {
    const toastId = toast.loading("Signing in...");
    const { username, password } = data;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
        callbackUrl: "/dashboard",
      });

      toast.dismiss(toastId);

      if (res?.error) {
        const errorData = JSON.parse(res.error); // Parse the error response
        toast.error("Sign in error", {
          description: errorData.message,
        });
      } else {
        toast.success("Sign in success", {
          description: "Please wait!",
        });
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.dismiss(toastId);

      const errormsg = JSON.parse(error);

      console.error("Unexpected error:", error);
      toast.error("Sign in error", {
        description: errormsg,
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
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="green"
            size="lg"
            type="submit"
            className="font-bold"
            disabled={form.formState.isSubmitting}
          >
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
