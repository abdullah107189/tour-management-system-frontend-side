import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <Button variant="outline" className="w-full">
        {props.name} with Google
      </Button>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>
      <div className="text-center text-sm">
        <>{`${
          props.name == "Login" ? "Don't have an account? " : "You have account then "
        }`}</>
        <Link
          to={`${props.name !== "Login" ? "/login" : "/register"}`}
          className="underline underline-offset-4"
        >
          {`${props.name !== "Login" ? "Login" : "Register"}`}
        </Link>
      </div>
    </form>
  );
}
