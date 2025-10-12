import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Assuming tours data is passed as props or fetched here. For example:
const tours = [
  {
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
  },
  // Add more tours if needed
];

const Tour = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Available Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <Card key={tour._id.$oid} className="overflow-hidden">
            <img
              src={tour.images[0]}
              alt={tour.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <CardTitle>{tour.title}</CardTitle>
              <CardDescription>{tour.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Starting from {tour.costFrom} BDT
              </p>
              <p className="text-sm text-muted-foreground">
                Start Date:{" "}
                {new Date(tour.startDate.$date).toLocaleDateString()}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tour.amenities.map((amenity) => (
                  <div key={amenity}>{amenity}</div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <a href={`/tours/${tour.slug}`}>View Details</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tour;
