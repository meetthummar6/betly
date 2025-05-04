import { createFileRoute } from '@tanstack/react-router'
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import Api from "../../axios/Api";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/auth/AuthContext";
import { useEffect } from "react";


export const Route = createFileRoute('/_Layout/EditProfile')({
  component: RouteComponent,
})
const formSchema = z.object({
  username: z.string().max(20, "Username must be at most 20 characters long"),
  oldPassword: z.string().min(8, "Password must be at least 8 characters long"),
  newPassword: z.string().min(8, "Password must be at least 8 characters long"),
});
function RouteComponent() {
  const {user} = useAuth();
    const navigate= useNavigate();

     const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
          username: "",
          oldPassword: "",
          newPassword: "",
        },
        resolver: zodResolver(formSchema),
      });
    
      const onSubmit = (data: z.infer<typeof formSchema>) => {
        const newUser = { username: data.username, oldPassword: data.oldPassword, newPassword: data.newPassword };
        Api.patch(`/users/change-password`, newUser).then(
          () => {
            toast.success("User updated successfully");
            navigate({to:'/'});
          }
        ).catch(
          (err) => {
            toast.error(err.response.data.message);
          }
        )
      };
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-[0_0_12px_rgba(0,255,255,0.5)] mx-4 sm:mx-0">
            <p className="mt-4 text-xl font-semibold tracking-tight text-stone-50">
              change password for <span className="text-cyan-200">{user?.username}</span>
            </p>
    
            <Form {...form}>
              <form
                className="w-full space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-stone-50">Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="w-full text-stone-50"
                          {...field}
                          value={user?.username}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-stone-50">Old Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="w-full text-stone-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-stone-50">New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="w-full text-stone-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-4 w-full bg-stone-950 hover:bg-stone-800">
                  change password
                </Button>
              </form>
            </Form>
          </div>
        </div>
      );
}

