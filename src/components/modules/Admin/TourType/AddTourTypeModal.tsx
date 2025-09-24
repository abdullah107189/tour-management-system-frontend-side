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
import { useAddTourTypeMutation } from "@/redux/features/TourType/tourType.api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddTourTypeModal() {
  const [open, setOpen] = useState(false);
  const [addTourType, { isLoading }] = useAddTourTypeMutation();
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: { name: string }) => {
    try {
      const res = await addTourType(data).unwrap();

      if (res.success) {
        toast.success("Tour type added successfully!");
        setOpen(false);
        form.reset();
      }
    } catch (error) {
      toast.error(error?.data?.message);
      console.error("Failed to add tour type:", error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Tour Type</DialogTitle>
            <DialogDescription>
              Please enter the details for the new tour type.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              id="tour-type-form"
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
              <Button type="submit" disabled={isLoading} form="tour-type-form">
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
