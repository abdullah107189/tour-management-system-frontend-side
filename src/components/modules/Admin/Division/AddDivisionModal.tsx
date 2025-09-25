import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import SingleImageUploader from "@/components/SingleImageUploader";
import { useAddDivisionMutation } from "@/redux/features/Division/division.api";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddDivisionModal() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const formSchema = z.object({
    name: z
      .string()
      .min(1, {
        message: "Name must be at least 1 character.",
      })
      .max(50, {
        message: "Name cannot exceed 50 characters.",
      }),
    description: z
      .string()
      .min(1, {
        message: "Description must be at least 1 character.",
      })
      .max(200, {
        message: "Description cannot exceed 200 characters.",
      }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [addDivision, isLoading] = useAddDivisionMutation();
  const onSubmit = async (data: { name: string; description: string }) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("file", image as File);
      const res = await addDivision(formData).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res?.message || "Division added successFully done");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some think problem");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Division Add</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Division</DialogTitle>
            <DialogDescription>
              Please enter the details for the new division.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              id="division-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Adventure" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Type your message here."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <SingleImageUploader onChange={setImage}></SingleImageUploader>
          <Button
            type="submit"
            disabled={isLoading.isLoading || !image}
            form="division-form"
          >
            {isLoading.isLoading ? "Adding..." : "Add"}
          </Button>
          {/* <Button type="submit" form="division-form">
            Submit
          </Button> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
