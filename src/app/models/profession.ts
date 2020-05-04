import {Profile} from './profile';

export interface Profession {
    profession_img: string;
    id: number;
    name: string;
    profiles: Profile[];
}
