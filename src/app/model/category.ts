import {Product} from './product';

export interface Category {
    category_img: string;
    id: string;
    name: string;
    products: Product[];
}
