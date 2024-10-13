import { Item } from "./item";
import { Location } from "./location";
export interface Place {
    id: string; // unique identifier
    placeName: string; // name of the place
    description?: string; // optional description
    location?: Location; // optional reference to Location
    items?: Item[]; // optional list of items stored in the place
    barcode?: string; // optional barcode
  }