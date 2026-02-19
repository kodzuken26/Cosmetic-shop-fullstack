export interface IProduct{
    id: number;
    name: string;
    slug: string;
    description: string;
    full_description: string;
    price: number;
    image: ImageBitmap;
    use: string;
    ingredients: string;
    size: number;
    category: string | ICategory;
}

export interface ICategory {
    id: number;
    name: string;
    slug: string;
}