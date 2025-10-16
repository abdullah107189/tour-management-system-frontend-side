import React, { useState } from "react";
import { Plus, Minus, Calendar, Shield, CreditCard, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ITour } from "@/types/tour.type";

interface TourDetailsSidebarProps {
  tour: ITour;
}

export default function TourDetailsSidebar({ tour }: TourDetailsSidebarProps) {
  const [bookingDate, setBookingDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [guests, setGuests] = useState(1);

  // ✅ costFrom use করছি (তোমার database field)
  const calculateTotalPrice = () => {
    const basePrice = tour.costFrom || 1;
    const serviceFee = basePrice * guests * 0.1;
    const total = basePrice * guests + serviceFee;
    return Math.round(total * 100) / 100;
  };

  const handleBooking = () => {
    const totalPrice = calculateTotalPrice();
    console.log("Booking Details:", {
      date: bookingDate,
      guests,
      totalPrice,
      tourId: tour._id // ✅ _id use করছি
    });
  };

  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-8 border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Book This Tour</CardTitle>
          <CardDescription>Secure your spot today</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">
              Select Date
            </label>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-3 border border-input bg-background rounded-md text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

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
            <div className="flex justify-between text-muted-foreground text-sm">
              <span>Service fee</span>
              <span>
                ${Math.round((tour.costFrom || 1) * guests * 0.1 * 100) / 100}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t border-border pt-3 text-foreground">
              <span>Total</span>
              <span>${calculateTotalPrice()}</span>
            </div>
          </div>

          {/* Book Button */}
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-medium py-3 text-base"
            size="lg"
            onClick={handleBooking}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
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
    </div>
  );
}