import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Calendar } from "lucide-react";
import { useNavigate } from "react-router";
import { useGetAllTourQuery } from "@/redux/features/Tour/tour.api";
import { useGetAllTourTypeQuery } from "@/redux/features/TourType/tourType.api";

const tours = [
  {
    id: "1",
    title: "Bali Cultural Experience",
    description:
      "Explore the rich culture and beautiful landscapes of Bali with our comprehensive tour package.",
    price: 899,
    duration: "7 days",
    location: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    reviews: 124,
    category: "Cultural",
    highlights: [
      "Ancient temples",
      "Traditional dance",
      "Local markets",
      "Beach relaxation",
    ],
  },
  {
    id: "2",
    title: "Japanese Alps Adventure",
    description:
      "Hike through the stunning Japanese Alps and experience traditional mountain culture.",
    price: 1200,
    duration: "10 days",
    location: "Nagano, Japan",
    image:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    reviews: 89,
    category: "Adventure",
    highlights: [
      "Mountain hiking",
      "Hot springs",
      "Traditional villages",
      "Wildlife spotting",
    ],
  },
  {
    id: "3",
    title: "Italian Culinary Tour",
    description:
      "Discover the authentic flavors of Italy through cooking classes and vineyard visits.",
    price: 1500,
    duration: "8 days",
    location: "Tuscany, Italy",
    image:
      "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    reviews: 156,
    category: "Culinary",
    highlights: [
      "Cooking classes",
      "Wine tasting",
      "Market tours",
      "Farm visits",
    ],
  },
  {
    id: "4",
    title: "Egyptian History Expedition",
    description:
      "Journey through ancient Egypt and explore the wonders of pharaohs and pyramids.",
    price: 1100,
    duration: "9 days",
    location: "Cairo, Egypt",
    image:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    reviews: 203,
    category: "Historical",
    highlights: [
      "Pyramids of Giza",
      "Nile cruise",
      "Valley of Kings",
      "Egyptian Museum",
    ],
  },
];
export function Tours() {
  const { data: allTour } = useGetAllTourQuery(undefined);
  const { data: allTourType } = useGetAllTourTypeQuery(undefined);
  console.log(allTour);
  console.log(allTourType);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Cultural",
    "Adventure",
    "Culinary",
    "Historical",
    "Beach",
  ];

  const filteredTours =
    selectedCategory === "All"
      ? tours
      : tours.filter((tour) => tour.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Discover Amazing Tours
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collection of unforgettable travel experiences
            around the world
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTours.map((tour) => (
            <Card
              key={tour.id}
              className="overflow-hidden py-0 pb-4 hover:shadow-lg transition-all duration-300 "
            >
              <div className="relative">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 border border-border">
                  <span className="text-sm font-semibold text-foreground">
                    ${tour.price}
                  </span>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                    {tour.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-chart-4 text-chart-4" />
                    <span className="text-sm font-medium text-foreground">
                      {tour.rating}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({tour.reviews})
                    </span>
                  </div>
                </div>
                <CardTitle className="text-xl text-foreground">
                  {tour.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {tour.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-chart-1" />
                    <span>{tour.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-chart-2" />
                    <span>{tour.duration}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-semibold mb-2 text-foreground">
                    Highlights:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {tour.highlights.slice(0, 3).map((highlight, index) => (
                      <span
                        key={index}
                        className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-md"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => navigate(`/tour-details/${tour.id}`)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No tours found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
