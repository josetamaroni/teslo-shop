export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    //todo type: Category;
    gender: Gender;
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
export type Category = 'shirts' | 'pants' | 'hoodies' | 'hats';