import { DeliveryPoint } from "./DeliveryPoint";

export interface Company{
    id?:string;
    name?:string;
    street?:string;
    streetNumber?:string;
    city?:string;
    postCode?:string;
    openHours?:string;
    deliveryPoint?: DeliveryPoint[];
    contacts?:string[];
    workers?:string[];
    comments:string;
    }