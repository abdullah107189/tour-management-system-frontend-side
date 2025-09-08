import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "@/components/ui/PasswordInput";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email." })
    .email({ message: "Invalid email address." }),

  password: z
    .string()
    .min(1, { message: "Please enter a password." })
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export function LoginForm({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  const [login] = useLoginMutation();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // if not using loginSchema
  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //   console.log(data);
  // };
  const navigate = useNavigate();
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const result = await login(userInfo).unwrap();

      if (result.data) {
        toast.success("User Logged In successfully done !");
      }
    } catch (err) {
      const error = err as FetchBaseQueryError;
      if (error?.status === 401) {
        toast.error((error.data as { message: string })?.message);
        navigate("/verify");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {/* email  */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password  */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder={"password"}
                    ></PasswordInput>
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          Register With Google
        </Button>
      </div>
      <div className="text-center text-sm">
        You have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
