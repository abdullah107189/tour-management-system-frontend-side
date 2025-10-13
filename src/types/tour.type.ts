export interface ITourType {
  _id?: string;
  name: string;
}
export interface ITour {
  _id?: string;
  title: string;
  slug: string;
  description?: string;
  images: string[];
  location?: string;
  costFrom?: number;
  startDate?: Date;
  endDate?: Date;
  included?: string[];
  excluded?: string[];
  amenities?: string[];
  tourPlan?: [string];
  maxGuests?: number;
  minAge?: number;
  division: string;
  tourType: string;
  deleteImages?: string[];
}
