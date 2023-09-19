import { Address } from "./address";
import { Car } from "./car";
import { Eveniment } from "./eveniment";
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
    eventsID?:string[];
    age?: number;
    zodiac?: string;
    comments?: string;


}