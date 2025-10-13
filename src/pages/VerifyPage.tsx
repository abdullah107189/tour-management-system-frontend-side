import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
export default function VerifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email]);

  const FormSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying OTP");
    try {
      const res = await verifyOtp({ email, otp: data.pin }).unwrap();
      if (res.success) {
        toast.success("OTP Verified", { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleConfirm = async () => {
    const toastId = toast.loading("Sending OTP");
    try {
      const res = await sendOtp({ email }).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
        setConfirmed(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send OTP.", { id: toastId });
    }
  };

  // State for the resend timer
  const [resendTimer, setResendTimer] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  // Function to handle the resend logic
  const handleResendOtp = async () => {
    // Disable the button immediately
    setIsResendDisabled(true);

    const toastId = toast.loading("Resending OTP");
    try {
      const res = await sendOtp({ email }).unwrap();
      if (res.success) {
        toast.success("New OTP sent!", { id: toastId });
        // Start the timer
        setResendTimer(120);
      }
    } catch (error) {
      console.error("Failed to resend OTP", error);
      toast.error("Failed to resend OTP.", { id: toastId });
    }
  };

  // useEffect to manage the timer countdown
  useEffect(() => {
    if (isResendDisabled && resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (resendTimer === 0) {
      setIsResendDisabled(false);
    }
  }, [isResendDisabled, resendTimer]);

  return (
    <div className="container mx-auto grid place-content-center h-screen">
      {confirmed ? (
        <Card>
          <CardHeader>
            <CardTitle>Verify Your Mail</CardTitle>
            <CardDescription>
              please enter this code. And don't share any one this code !
            </CardDescription>
            <CardAction>OTP Input</CardAction>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <Dot></Dot>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <Dot></Dot>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot></Dot>
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <Dot></Dot>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <Dot></Dot>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your phone.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button form="otp-form" type="submit">
              Submit
            </Button>
            <Button
              onClick={handleResendOtp}
              disabled={isResendDisabled}
              variant="ghost"
            >
              {isResendDisabled ? `Resend in ${resendTimer}s` : "Resend OTP"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="">
          <CardHeader>
            <CardTitle>Verify Your email Address</CardTitle>
            <CardDescription>
              We will send you an OTP at <br /> {email}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              onClick={() => handleConfirm()}
              form="otp-form"
              className="min-w-[300px]"
              type="submit"
            >
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
