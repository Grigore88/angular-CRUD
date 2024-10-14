import { Place } from "./place";
export interface Item {
    id: string; // unique identifier
    itemName: string; // name of the item
    place?: Place; // optional reference to Place
    expireDate?: Date; // optional expiration date
    daysUntilExpire?: number;
    description?: String;
    barcode?: string; // optional barcode
    photo?: ArrayBuffer; // optional for storing a photo of the item
  }