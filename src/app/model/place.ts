import {City} from './city';

export class Place {
    id: string;
    title: string;
    description?: string;
    city: City;
    imgUrl: string;
    isVisted?: boolean;
    isSaved?: boolean;

}
