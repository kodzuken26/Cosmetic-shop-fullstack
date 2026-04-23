export interface IProduct{
    data: {
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
    } | null;
    loading: boolean;
    error: null | string;
}

export interface ICategory {
    id: number;
    name: string;
    slug: string;
}

export interface IUser {
    id: number;
    user: string;
    nickname: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    gender: string;
}