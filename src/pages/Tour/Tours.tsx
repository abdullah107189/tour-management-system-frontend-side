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

export function Tours() {
  const navigate = useNavigate();
  const [selectedTypeId, setSelectedTypeId] = useState<string>("all");

  const { data: tourResponse, isLoading: isTourLoading } =
    useGetAllTourQuery(selectedTypeId);

  const { data: tourTypeResponse, isLoading: isTourTypeLoading } =
    useGetAllTourTypeQuery(undefined);

  console.log(tourResponse?.data);
  const allTours: ITour[] = tourResponse?.data || [];
  const allTourTypes: ITourType[] = (tourTypeResponse as ITourType[]) || [];

  const categories = useMemo(() => {
    const baseCategories = [{ _id: "all", name: "All Tours", slug: "all" }];
    if (Array.isArray(allTourTypes)) {
      return [...baseCategories, ...allTourTypes];
    }
    return baseCategories;
  }, [allTourTypes]);

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
          {allTours?.map((tour) => (
            <Card
              key={tour._id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border"
            >
              <div className="relative">
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 border border-border">
                  <span className="text-sm font-semibold text-foreground">
                    ${tour.costFrom}
                  </span>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                    {tour.location || "Popular"}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-chart-4 text-chart-4" />
                    <span className="text-sm font-medium text-foreground">
                      4.8
                    </span>
                    <span className="text-sm text-muted-foreground">(124)</span>
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
                    <span>{tour.location || "Multiple Locations"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-chart-2" />
                    {/* <span>{tour.duration || "Flexible"}</span> */}
                    333333333
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-semibold mb-2 text-foreground">
                    Highlights:
                  </h4>
                  {/* <div className="flex flex-wrap gap-1">
                    {tour.highlights?.slice(0, 3).map((highlight, index) => (
                      <span
                        key={index}
                        className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-md"
                      >
                        {highlight}
                      </span>
                    )) || (
                      <>
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-md">
                          Cultural Experience
                        </span>
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-md">
                          Guided Tours
                        </span>
                        <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-md">
                          Amazing Views
                        </span>
                      </>
                    )}
                  </div> */}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
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
