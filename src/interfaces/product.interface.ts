import { Category } from "./category.interface";


export interface Product {
    id: string;
    title: string;
    description: string;
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[]; 
    gender: Gender;
    category: Category;
    images: string[];
}
export interface CartProduct {
    id: string;
    slug: string;
    title: string;
    price: number;
    size: Size;
    quantity: number;
    image: string;
}

export type Gender = 'men' | 'women' | 'kid' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
// export type Category = 'shirts' | 'pants' | 'hoodies' | 'hats';