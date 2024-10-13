import { Place } from "./place";
export interface Location {
    id: string; // unique identifier
    name: string; // name of the location
    description?: string; // optional description
    places?: Place[]; // optional list of places
  }