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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FullProfileSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SecondStepProps {
  username: string;
  password: string;
  onSubmit: (data: any) => Promise<void>;
}

const SecondStep: React.FC<SecondStepProps> = ({
  username,
  password,
  onSubmit,
}) => {
  const form = useForm<z.infer<typeof FullProfileSchema>>({
    resolver: zodResolver(
      FullProfileSchema.omit({ username: true, password: true }),
    ),
    mode: "onBlur",
    defaultValues: {
      name: "",
      birthDate: new Date(Date.now()),
      gender: "",
      gamblingStory: "",
      gamblingDuration: 0,
      whyStop: "",
    },
  });

  const [isAgreed, setIsAgreed] = useState(false);

  const handleSubmit = async (data: z.infer<typeof FullProfileSchema>) => {
    await onSubmit({ ...data, username, password });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-[80%] flex-col items-center justify-center gap-5 text-start"
        >
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
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
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
          />
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
          />
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
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreement"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="agreement">
              By submitting this form, you agree to share your data with
              GambleGone. This data will be used to help improve the user
              experience on this website.
            </label>
          </div>
          <Button
            variant="green"
            size="lg"
            type="submit"
            className="font-bold"
            disabled={!isAgreed || form.formState.isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SecondStep;
