/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Calendar, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useGetAllTourQuery } from "@/redux/features/Tour/tour.api";
import { useGetAllTourTypeQuery } from "@/redux/features/TourType/tourType.api";
import type { ITour, ITourType } from "@/types/tour.type";
import { format } from "date-fns";

export function Tours() {
  const navigate = useNavigate();
  const [selectedTypeId, setSelectedTypeId] = useState<string>("all");

  const { data: tourResponse, isLoading: isTourLoading } =
    useGetAllTourQuery(selectedTypeId);

  const { data: tourTypeResponse, isLoading: isTourTypeLoading } =
    useGetAllTourTypeQuery(undefined);

  const allTours: ITour[] = tourResponse?.data || [];
  const allTourTypes: ITourType[] = (tourTypeResponse as ITourType[]) || [];

  const categories = useMemo(() => {
    const baseCategories = [{ _id: "all", name: "All Tours", slug: "all" }];
    if (Array.isArray(allTourTypes)) {
      return [...baseCategories, ...allTourTypes];
    }
    return baseCategories;
  }, [allTourTypes]);

  // Function to get tour type name by ID
  const getTourTypeName = (tourTypeId: string) => {
    const tourType = tourTypeResponse?.data?.find(
      (type: ITourType) => type._id === tourTypeId
    );
    return tourType?.name || "Adventure";
  };

  if (isTourLoading || isTourTypeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-lg text-primary">Loading tours...</p>
      </div>
    );
  }

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
          {categories?.map((category) => (
            <Button
              key={category?._id}
              variant={selectedTypeId === category?._id ? "default" : "outline"}
              onClick={() => setSelectedTypeId(category?._id as string)}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allTours?.map((tour: ITour) => (
            <Card
              key={tour._id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border group cursor-pointer"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={tour.images?.[0] || "/placeholder-tour.jpg"}
                  alt={tour.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 border border-border shadow-sm">
                  <span className="text-sm font-semibold text-foreground">
                    ${tour.costFrom || "N/A"}
                  </span>
                </div>

                {/* Image Counter */}
                {tour.images && tour.images.length > 1 && (
                  <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 border border-border">
                    <span className="text-xs font-medium text-foreground">
                      +{tour.images.length - 1}
                    </span>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                {/* Rating and Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md capitalize">
                    {getTourTypeName(tour.tourType as string)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-foreground">
                      4.8
                    </span>
                    <span className="text-xs text-muted-foreground">(24)</span>
                  </div>
                </div>

                {/* Title and Description */}
                <CardTitle className="text-lg font-bold text-foreground line-clamp-1">
                  {tour.title || "Untitled Tour"}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm mt-1">
                  {tour.description ||
                    "Explore this amazing tour with unforgettable experiences."}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-3">
                {/* Tour Details */}
                <div className="space-y-3">
                  {/* Start Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>
                      Starts :{" "}
                      {tour.startDate
                        ? format(tour.startDate, "MMM d, yyyy")
                        : "Flexible"}
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span>Duration: 3 days</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="capitalize">
                      {tour.division || "Multiple Locations"}
                    </span>
                  </div>
                </div>

                {/* ... Rest of your card content ... */}
              </CardContent>

              <CardFooter className="pt-2">
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-medium"
                  onClick={() => navigate(`/tour-details/${tour.slug}`)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {allTours.length === 0 && (
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
