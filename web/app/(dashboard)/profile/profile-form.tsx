"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FullProfileUpdateSchema } from "@/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { differenceInYears, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type UserUpdate = Omit<
  User,
  "createdAt" | "updatedAt" | "password" | "totalPoints"
>;
interface ProfileFormProps {
  User: UserUpdate;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ User }) => {
  const router = useRouter();
  const { data, update } = useSession();

  const [isEditing, setIsEditing] = useState(false);

  const {
    birthDate,
    gamblingDuration,
    gamblingStory,
    gender,
    name,
    username,
    whyStop,
  } = User;

  const defaultValues: z.infer<typeof FullProfileUpdateSchema> = {
    birthDate,
    gamblingDuration,
    gamblingStory,
    gender,
    name,
    password: "",
    username,
    whyStop,
  };

  const form = useForm({
    resolver: zodResolver(FullProfileUpdateSchema),
    defaultValues,
    mode: "onBlur",
  });

  const handleSwitchEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const onSubmit = async (data: z.infer<typeof FullProfileUpdateSchema>) => {
    const {
      username,
      password,
      name,
      gender,
      birthDate,
      gamblingDuration,
      gamblingStory,
      whyStop,
    } = data;

    const toastId = toast.loading("Updating profile...");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("birthDate", birthDate.toISOString());
    formData.append("gamblingDuration", gamblingDuration.toString());
    formData.append("gamblingStory", gamblingStory);
    formData.append("whyStop", whyStop);

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        body: formData,
      });

      toast.dismiss(toastId);

      if (!response.ok) {
        const data = await response.json();
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
      } else {

        await update();
        router.refresh();

        toast.success("Profile updated");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("Update profile error", {
        description: "Failed to update profile",
      });
    }
    router.refresh();
    setIsEditing(false);
  };
  const Logout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await signOut({ redirect: false, callbackUrl: "/" });
      toast.dismiss(toastId);
      toast.success("Logout success");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout error", {
        description: "Failed to logout",
      });
    }
  };
  return (
    <div className="flex flex-col gap-5 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center justify-center gap-5 text-start"
        >
          <section className="flex flex-row w-full gap-10">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Username" {...field} disabled />
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
                      disabled={!isEditing}
                    />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
              disabled={!isEditing}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name, anonymous is fine"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              disabled={!isEditing}
            />
          </section>

          <section className="flex flex-row w-full gap-10">
            <FormField
              control={form.control}
              name="gamblingDuration"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Gambling Duration months</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              disabled={!isEditing}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input placeholder="Gender" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              disabled={!isEditing}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mr-10">Birth Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            " pl-3 text-left font-normal disabled:opacity-80 disabled:bg-slate-100  disabled:cursor-not-allowed  w-full",
                            !field.value && "text-muted-foreground",
                          )}
                          disabled={!isEditing}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        fromYear={1960}
                        toYear={2030}
                        captionLayout="dropdown-buttons"
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
              disabled={!isEditing}
            />
          </section>
          <FormField
            control={form.control}
            name="gamblingStory"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Gambling Story</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Tell us how you started gambling"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            disabled={!isEditing}
          />

          <FormField
            control={form.control}
            name="whyStop"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Reason you stopped gambling</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none"
                    placeholder="Tell us why you stopped gambling"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            disabled={!isEditing}
          />

          <section className="flex flex-row items-start w-full gap-10">
            <Button onClick={Logout} variant={"purple"} size={"lg"}>
              Logout
            </Button>
            {isEditing ? (
              <section className="flex flex-row gap-10 ml-auto">
                <Button
                  variant="green"
                  size="lg"
                  type="submit"
                  className="font-bold"
                  disabled={form.formState.isSubmitting}
                >
                  Submit
                </Button>
                <Button
                  onClick={handleSwitchEdit}
                  type="button"
                  variant={"black"}
                  size="lg"
                >
                  Cancel
                </Button>
              </section>
            ) : (
              <Button
                onClick={handleSwitchEdit}
                type="button"
                variant={"green"}
                size={"lg"}
                className="ml-auto"
              >
                Edit
              </Button>
            )}
          </section>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
