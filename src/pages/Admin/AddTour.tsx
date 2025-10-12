/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import z, { includes } from "zod";
import { useGetAllDivisionQuery } from "@/redux/features/Division/division.api";
import { useGetAllTourTypeQuery } from "@/redux/features/TourType/tourType.api";
import type { IDivision } from "@/types";
import { cn } from "@/lib/utils";
import { format, formatISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import MultipleImageUploader from "@/components/MultipleImageUploader";
import { useAddTourMutation } from "@/redux/features/Tour/tour.api";
import { useState } from "react";
import type { FileMetadata } from "@/hooks/use-file-upload";

export default function AddTour() {
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
  const tourSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    images: z.array(z.string().url()).optional(),
    location: z.string().optional(),
    costFrom: z.number().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    included: z.array(z.object({ value: z.string() })).optional(),
    excluded: z.array(z.string()).optional(),
    amenities: z.array(z.string()).optional(),
    tourPlan: z.array(z.string()).optional(),
    maxGuests: z.number().optional(),
    minAge: z.number().optional(),
    division: z.string().min(1, "Division is required"),
    tourType: z.string().min(1, "Tour Type is required"),
    deleteImages: z.array(z.string()).optional(),
  });
  type TourFormValues = z.infer<typeof tourSchema>;

  const form = useForm<TourFormValues>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      title: "",
      images: [],
      division: "",
      tourType: "",
      endDate: new Date(),
      startDate: new Date(),
      included: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "included",
  });

  const { data: divisionData, isLoading: divisionLoading } =
    useGetAllDivisionQuery(undefined);
  const { data: tourData, isLoading: tourTypeLoading } =
    useGetAllTourTypeQuery(undefined);
  const [addTour, isLoading] = useAddTourMutation();
  const onSubmit = async (data: TourFormValues) => {
    const tourData = {
      ...data,
      startDate: formatISO(data?.startDate as Date),
      endDate: formatISO(data?.endDate as Date),
      included: data?.included?.map((item: { value: string }) => item.value),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(tourData));
    images.forEach((image) => formData.append("files", image as File));
    // console.log(tourData);
    // console.log(formData);
    // try {
    //   const res = await addTour(formData).unwrap();
    //   console.log(res);
    // } catch (error: any) {
    //   console.log(error);
    //   console.log(error.message);
    // }
  };

  return (
    <div className="max-w-7xl mx-auto bg-card p-5 rounded-2xl w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tour title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* division  */}
            <FormField
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Division</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {divisionData?.map((item: IDivision) => (
                        <SelectItem
                          disabled={divisionLoading}
                          key={item?._id}
                          value={item?._id as string}
                        >
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* tour type  */}
            <FormField
              control={form.control}
              name="tourType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tour Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tour type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tourData?.data?.map(
                        (item: { _id: string; name: string }) => (
                          <SelectItem
                            disabled={tourTypeLoading}
                            key={item?._id}
                            value={item?._id}
                          >
                            {item.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* start date  */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
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
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                          new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* end date  */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
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
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date <
                          new Date(new Date().setDate(new Date().getDate() - 1))
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2">
              <MultipleImageUploader
                onChange={setImages}
              ></MultipleImageUploader>
            </div>
            {/* Add more fields here in a similar grid layout. For large fields like description, you can make them span multiple columns. */}
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a detailed description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="border-b border-muted"></div>
          {/* included button  */}
          <Button type="button" onClick={() => append({ value: "" })}>
            Add Included
          </Button>
          <div>
            {fields.map((item, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`included.${index}.value`}
                render={({ field }) => (
                  <FormItem className="col-span-2 mb-2">
                    <FormLabel>Tour Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tour title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="flex items-end justify-end">
            <Button
              type="submit"
              disabled={isLoading.isLoading || images.length === 0}
            >
              {isLoading.isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isLoading.isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
