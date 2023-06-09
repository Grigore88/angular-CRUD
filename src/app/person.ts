import { Address } from "./address";
import { Car } from "./car";
export interface Person{
    id?: string;
    firstName: string;
    lastName: string;
    maidenName?: string;
    dateOfBirth?: Date;
    dateOfDeath?: Date;
    isAlive?: boolean;
    phone?: string[];
    email?: string;
    gender?: string;
    address?: Address[];
    carsList?: Car[];
    age?: number;
    zodiac?: string;
    comments?: string;


}