import { Address } from "./address";
import { Car } from "./car";
export interface Person{
    id?: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    phone?: string[];
    email?: string;
    gender?: string;
    address?: Address[];
    carsList?: Car[];
    age?: number;
    zodiac?: string;
    comments?: string;


}