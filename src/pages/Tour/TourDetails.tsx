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
import {
  Star,
  MapPin,
  Clock,
  Users,
  Calendar,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";

const tourData = {
  id: "1",
  title: "Bali Cultural Experience",
  description:
    "Explore the rich culture and beautiful landscapes of Bali with our comprehensive tour package. This immersive journey takes you through ancient temples, traditional villages, and stunning natural wonders.",
  price: 899,
  duration: "7 days",
  location: "Bali, Indonesia",
  image:
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  rating: 4.8,
  reviews: 124,
  category: "Cultural",
  groupSize: "2-12 people",
  highlights: [
    "Visit ancient temples including Tanah Lot and Uluwatu",
    "Traditional Balinese dance performances",
    "Local market exploration in Ubud",
    "Beach relaxation in Seminyak",
    "Rice terrace trekking",
    "Traditional cooking class",
  ],
  included: [
    "6 nights accommodation in 4-star hotels",
    "Daily breakfast and 4 dinners",
    "Professional English-speaking guide",
    "All transportation during the tour",
    "Entrance fees to all attractions",
    "Traditional dance performance tickets",
  ],
  excluded: [
    "International flight tickets",
    "Travel insurance",
    "Lunches and some dinners",
    "Personal expenses",
    "Visa fees (if applicable)",
    "Optional activities",
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Bali",
      description:
        "Welcome to the Island of Gods! Transfer to your hotel and enjoy a welcome dinner.",
      activities: ["Airport pickup", "Hotel check-in", "Welcome dinner"],
    },
    {
      day: 2,
      title: "Ubud Cultural Discovery",
      description:
        "Explore the cultural heart of Bali with visits to temples and art markets.",
      activities: [
        "Ubud Palace",
        "Art market",
        "Traditional dance performance",
      ],
    },
    {
      day: 3,
      title: "Rice Terraces & Cooking Class",
      description:
        "Trek through stunning rice terraces and learn authentic Balinese cooking.",
      activities: [
        "Tegalalang Rice Terraces",
        "Cooking class",
        "Local village visit",
      ],
    },
    {
      day: 4,
      title: "Temple Tour",
      description:
        "Visit Bali's most iconic temples perched on dramatic cliff sides.",
      activities: ["Tanah Lot Temple", "Uluwatu Temple", "Kecak fire dance"],
    },
    {
      day: 5,
      title: "Beach Relaxation",
      description:
        "Enjoy a day at one of Bali's most beautiful beaches with optional water sports.",
      activities: ["Seminyak Beach", "Beach clubs", "Water sports (optional)"],
    },
    {
      day: 6,
      title: "Free Day & Optional Activities",
      description: "Choose your own adventure or relax at your leisure.",
      activities: ["Spa treatments", "Shopping", "Surf lessons", "Free time"],
    },
    {
      day: 7,
      title: "Departure",
      description:
        "Transfer to the airport for your departure with unforgettable memories.",
      activities: ["Hotel check-out", "Airport transfer"],
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1506003094589-53954a26283f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  ],
};

export function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingDate, setBookingDate] = useState("");

  // In a real app, you would fetch tour data based on the ID
  const tour = tourData;

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Tour not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b border-border">
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
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="rounded-lg overflow-hidden mb-4 border border-border">
                <img
                  src={tour.gallery[selectedImage]}
                  alt={tour.title}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {tour.gallery.map((image, index) => (
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
                      alt={`${tour.title} ${index + 1}`}
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
                      {tour.category}
                    </span>
                    <CardTitle className="text-3xl mt-2 text-foreground">
                      {tour.title}
                    </CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-foreground">
                      ${tour.price}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      per person
                    </div>
                  </div>
                </div>
                <CardDescription className="text-lg">
                  {tour.description}
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
                        {tour.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-chart-2" />
                    <div>
                      <div className="font-semibold text-foreground">
                        Duration
                      </div>
                      <div className="text-muted-foreground">
                        {tour.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-chart-3" />
                    <div>
                      <div className="font-semibold text-foreground">
                        Group Size
                      </div>
                      <div className="text-muted-foreground">
                        {tour.groupSize}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-5 h-5 fill-chart-4 text-chart-4" />
                  <span className="font-semibold text-foreground">
                    {tour.rating}
                  </span>
                  <span className="text-muted-foreground">
                    ({tour.reviews} reviews)
                  </span>
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
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tour.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card className="mb-8 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Itinerary</CardTitle>
                <CardDescription>
                  Day-by-day breakdown of your tour
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {tour.itinerary.map((day) => (
                    <div
                      key={day.day}
                      className="border-l-4 border-primary pl-6 pb-6"
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {day.day}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {day.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        {day.description}
                      </p>
                      <div className="space-y-1">
                        {day.activities.map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check className="w-4 h-4 text-chart-2" />
                            <span className="text-foreground">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
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
                    {tour.included.map((item, index) => (
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
                    {tour.excluded.map((item, index) => (
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
          <div className="lg:col-span-1">
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
                    <span>${tour.price}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-border pt-2 text-foreground">
                    <span>Total</span>
                    <span>${tour.price}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
