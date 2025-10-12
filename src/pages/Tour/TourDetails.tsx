// pages/TourDetails.jsx
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Assuming tour data is passed as props or fetched based on slug. For example:
const tour = {
  _id: { $oid: "68bfec2f5de9985416a5bff6" },
  title: "rajshahi safina park",
  description: "Watch both sunrise and sunset over the sea at Kuakata beach.",
  images: [
    "https://res.cloudinary.com/dx8td9daf/image/upload/v1757408295/p4ybbobcwgzqtdm9ucgv.jpg",
    "https://res.cloudinary.com/dx8td9daf/image/upload/v1757408300/kanerbctqgjbfxjglbmc.jpg",
  ],
  location: "Kuakata",
  costFrom: 3500,
  startDate: { $date: "2025-09-05T00:00:00.000Z" },
  included: ["Hotel stay", "Breakfast", "Bus ticket"],
  excluded: ["Seafood meals", "Local sightseeing"],
  amenities: ["WiFi"],
  tourPlan: [
    "Day 1: Journey to Kuakata",
    "Day 2: Explore beach & local sites",
    "Day 3: Return",
  ],
  minAge: 10,
  division: { $oid: "66c5d2f1a4b123456789abcd" },
  tourType: { $oid: "66c5d2f1a4b987654321abcd" },
  createdAt: { $date: "2025-09-09T08:58:23.227Z" },
  updatedAt: { $date: "2025-09-09T08:58:23.227Z" },
  slug: "rajshahi-safina-park",
};

const TourDetails = () => {
  return (
    <div className="container mx-auto py-8">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-3xl">{tour.title}</CardTitle>
          <CardDescription>{tour.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {tour.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${tour.title} image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Details</h2>
              <p>
                <strong>Location:</strong> {tour.location}
              </p>
              <p>
                <strong>Cost From:</strong> {tour.costFrom} BDT
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(tour.startDate.$date).toLocaleDateString()}
              </p>
              <p>
                <strong>Minimum Age:</strong> {tour.minAge}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {tour.amenities.map((amenity) => (
                  <div key={amenity}>{amenity}</div>
                ))}
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <h2 className="text-xl font-semibold mb-4">Tour Plan</h2>
          <ol className="list-decimal pl-6 space-y-2">
            {tour.tourPlan.map((day, index) => (
              <li key={index}>{day}</li>
            ))}
          </ol>
          <Separator className="my-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Included</h2>
              <ul className="list-disc pl-6 space-y-1">
                {tour.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Excluded</h2>
              <ul className="list-disc pl-6 space-y-1">
                {tour.excluded.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <div className="p-6">
          <Button size="lg">Book Now</Button>
        </div>
      </Card>
    </div>
  );
};

export default TourDetails;
