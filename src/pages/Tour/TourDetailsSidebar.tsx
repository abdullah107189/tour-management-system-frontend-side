import { useState } from "react";
import {
  Plus,
  Minus,
  Calendar,
  Shield,
  CreditCard,
  Clock,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ITour } from "@/types/tour.type";
import z from "zod";
import { useCreateBookingMutation } from "@/redux/features/Booking/booking.api";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
interface TourDetailsSidebarProps {
  tour: ITour;
}

export default function TourDetailsSidebar({ tour }: TourDetailsSidebarProps) {
  const [guests, setGuests] = useState(1);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const handleBookButtonClick = () => {
    setIsAlertOpen(true);
  };

  const calculateTotalPrice = () => {
    const basePrice = tour.costFrom || 1;
    const total = basePrice * guests;
    return Math.round(total * 100) / 100;
  };

  const tourBooking = z.object({
    guestCount: z.number().int().positive(),
    tour: z.string(),
  });

  const [createBooking, isLoading] = useCreateBookingMutation();

  const handleBooking = async () => {
    const bookingData = {
      guestCount: Number(guests),
      tour: tour._id,
    };
    setIsAlertOpen(false);

    try {
      const validatedData = tourBooking.parse(bookingData);
      console.log(validatedData);
      const booking = await createBooking(validatedData).unwrap();
      toast.success("Booking created successfully!");
      console.log(booking);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <div className="lg:col-span-1">
      <Card className=" border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Book This Tour</CardTitle>
          <CardDescription>Secure your spot today</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Guests Count */}
          <div>
            <label className="block text-sm font-medium mb-3 text-foreground">
              Number of Guests
            </label>
            <div className="flex items-center justify-between">
              <div className="font-medium text-foreground">Guests</div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                  disabled={guests <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center font-medium text-foreground">
                  {guests}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setGuests((prev) => prev + 1)}
                  disabled={guests >= (tour.maxGuests || 10)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex justify-between text-foreground">
              <span>
                ${tour.costFrom || 1} × {guests} guests
              </span>
              <span>${(tour.costFrom || 1) * guests}</span>
            </div>
            <div className="flex justify-between text-muted-foreground text-sm"></div>
            <div className="flex justify-between font-semibold text-lg border-t border-border pt-3 text-foreground">
              <span>Total</span>
              <span>${calculateTotalPrice()}</span>
            </div>
          </div>

          {/* Book Button */}
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-medium py-3 text-base"
            size="lg"
            onClick={handleBookButtonClick}
            disabled={isLoading.isLoading}
            type="button"
          >
            {isLoading.isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <Calendar className="w-4 h-4 mr-2" />
            {isLoading.isLoading ? "Booking..." : "Book Now"}
          </Button>

          {/* Extra Info */}
          <div className="text-center space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Free cancellation up to 24 hours before tour</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Secure payment processed</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Instant confirmation</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Your Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to book this tour for{" "}
              <span className="font-semibold">{guests} </span> guest
              {guests > 1 ? "s" : ""}. The total cost will be{" "}
              <span className="font-semibold">${calculateTotalPrice()}</span>.
              Do you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBooking}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
