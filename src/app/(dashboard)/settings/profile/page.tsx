"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userService } from "@/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

/**
 * Force the page to be static and only change with a new build.
 *
 * read more about the Route Segment Config here:
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
export const dynamic = "force-static";

/**
 * Generate the metadata with dynamic information.
 *
 * Read more about the Dynamic Metadata here:
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

const formSchema = z.object({
  fullName: z.string().min(2),
  username: z.string().min(2),
  email: z.string().email().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Page() {
  const { user } = userService();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.profile?.email ?? "",
      username: user?.profile?.username ?? "",
      fullName: user?.profile?.name ?? "",
    },
  });

  async function handleSubmit(data: FormData) {
    console.log(data);

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="rounded-md mx-auto border-none">
      <CardHeader>
        <CardTitle>User</CardTitle>
        <CardDescription>
          Used to identify your account and personalize your experience.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 max-w-xl">
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="First Name" {...field} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Username"
                      disabled
                      {...field}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email" {...field} />
                    <FormDescription>
                      The change of email on our platform is not reflected on
                      Github.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <Button>{isLoading ? "Saving..." : "Save Changes"}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
