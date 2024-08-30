import { Address } from "./address";
import { Car } from "./car";
import { Eveniment } from "./eveniment";
import { Relative } from "./models/relative";
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
    relatives?: Relative[];
    eventsID?: string[];
    age?: number;
    zodiac?: string;
    comments?: string;


}