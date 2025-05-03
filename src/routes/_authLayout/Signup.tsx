import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute('/_authLayout/Signup')({
    component: SignupComponent,
})

const formSchema = z.object({
    username: z.string().max(20, "Username must be at most 20 characters long"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  });

function SignupComponent(){
    const {user,loading}=useAuth();
    const navigate= useNavigate();

    useEffect(()=>{
        if(!loading && user) navigate({to:'/'});
    },[loading,user,navigate]);

     const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
          username: "",
          email: "",
          password: "",
        },
        resolver: zodResolver(formSchema),
      });
    
      const onSubmit = (data: z.infer<typeof formSchema>) => {
        const user = { username: data.username, email: data.email, password: data.password };
        Api.post('/users/register', user).then(
          () => {
            toast.success("User created successfully");
            navigate({to:'/login'});
          }
        ).catch(
          (err) => {
            toast.error(err.response.data.message);
          }
        );
      };
    
      if(loading || user) return <p>loading...</p>
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-[0_0_12px_rgba(0,255,255,0.5)] mx-4 sm:mx-0">
            <p className="mt-4 text-xl font-semibold tracking-tight text-stone-50">
              Log in to  <span className="text-cyan-200">Bet.ly</span>
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
                          placeholder="Username"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-stone-50">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-stone-50">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          className="w-full text-stone-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-4 w-full bg-stone-950 hover:bg-stone-800">
                  Sign up
                </Button>
              </form>
            </Form>
    
            <div className="mt-5 space-y-5">
              <p className="text-sm text-center text-stone-50">
                Already have an account?
                <Link to="/Login" className="ml-1 underline text-cyan-200">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
}
