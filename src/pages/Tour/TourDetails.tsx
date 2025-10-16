/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Users, ArrowLeft, Check, X } from "lucide-react";
import TourDetailsSidebar from "./TourDetailsSidebar";
import { useGetSingleTourQuery } from "@/redux/features/Tour/tour.api";
import type { ITour } from "@/types/tour.type";
import { format } from "date-fns";

function isValidDate(date: any): boolean {
  const dateObject = new Date(date);
  return !isNaN(dateObject.getTime()); // Returns true if it's a valid date
}
export function TourDetails() {
  const { slug } = useParams();
  const { data: tourInfo, isLoading: tourDetailsLoading } =
    useGetSingleTourQuery(slug) as { data: ITour; isLoading: boolean };

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  if (tourDetailsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg text-muted-foreground">
          Tour Information is loading...
        </p>
      </div>
    );
  }

  if (!tourInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Tour not found</p>
      </div>
    );
  }

  if (!tourInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Sorry! This tour is not found.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/tours")}
          className="flex items-center gap-2 text-foreground hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tours
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="rounded-lg overflow-hidden mb-4 border border-border">
                <img
                  src={tourInfo?.images[selectedImage]}
                  alt={tourInfo?.title}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {tourInfo?.images?.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${tourInfo?.title} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tour Information */}
            <Card className="mb-8 border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {tourInfo?.location}
                    </span>
                    <CardTitle className="text-3xl mt-2 text-foreground">
                      {tourInfo?.title}
                    </CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-foreground">
                      ${tourInfo?.costFrom}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per person
                    </div>
                  </div>
                </div>
                <CardDescription className="text-lg">
                  {tourInfo?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-chart-1" />
                    <div>
                      <div className="font-semibold text-foreground">
                        Location
                      </div>
                      <div className="text-muted-foreground">
                        {tourInfo?.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-chart-2" />
                    <div>
                      <div className="font-semibold text-foreground">
                        start Date
                      </div>
                      <div className="text-muted-foreground">
                        {format(tourInfo?.startDate as Date, "yyyy-MM-dd") ||
                          "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        End Date
                      </div>
                      <div className="text-muted-foreground">
                        {tourInfo?.endDate &&
                        isValidDate(tourInfo.endDate as Date)
                          ? format(tourInfo.endDate as Date, "yyyy-MM-dd")
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-chart-3" />
                    <div>
                      <div className="font-semibold text-foreground">
                        Max Guests
                      </div>
                      <div className="text-muted-foreground">
                        {tourInfo?.maxGuests}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-5 h-5 fill-chart-4 text-chart-4" />
                  <span className="font-semibold text-foreground">4.3 </span>
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card className="mb-8 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Tour Highlights
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Itinerary */}
            <Card className="mb-8 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Itinerary</CardTitle>
                <CardDescription>
                  Day-by-day breakdown of your tour
                </CardDescription>
              </CardHeader>
            </Card>

            {/* What's Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Check className="w-5 h-5 text-chart-2" />
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tourInfo?.included?.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-chart-2" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <X className="w-5 h-5 text-chart-5" />
                    What's Excluded
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tourInfo?.excluded?.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <X className="w-4 h-4 text-chart-5" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Sidebar */}
          {/* <div className="lg:col-span-1">
            <Card className="sticky top-8 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Book This Tour
                </CardTitle>
                <CardDescription>Secure your spot today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full p-3 border border-input bg-background rounded-md text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-foreground">
                    <span>Tour Price</span>
                    <span>${tourInfo?.price}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-border pt-2 text-foreground">
                    <span>Total</span>
                    <span>${tourInfo?.price}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  size="lg"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Free cancellation up to 24 hours before tour
                </div>
              </CardContent>
            </Card>
          </div> */}
          <TourDetailsSidebar tour={tourInfo}></TourDetailsSidebar>
        </div>
      </div>
    </div>
  );
}
