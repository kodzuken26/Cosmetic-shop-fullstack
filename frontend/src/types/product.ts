import type { CategoryState } from "./category";

export interface ProductState {
  data:
    | {
        id: number;
        name: string;
        slug: string;
        description: string;
        full_description: string;
        price: number;
        rating: number;
        image: string;
        use: string;
        ingredients: string;
        size: number;
        stock: number;
        category: string | CategoryState;
        images?: {
          id: number;
          image: string;
          is_main: boolean;
          order: number;
        }[];
      }[]
    | null;
  loading: boolean;
  error: null | string;
}

export enum ProductActionTypes {
  FETCH_PRODUCTS = "FETCH_PRODUCTS",
  FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS",
  FETCH_PRODUCTS_ERROR = "FETCH_TODOS_ERROR",
  FETCH_PRODUCT_BY_ID = "FETCH_PRODUCT_BY_ID",
  FETCH_PRODUCT_BY_ID_SUCCESS = "FETCH_PRODUCT_BY_ID_SUCCESS",
  FETCH_PRODUCT_BY_ID_ERROR = "FETCH_PRODUCT_BY_ID_ERROR",
}

interface FetchProductAction {
  type: ProductActionTypes.FETCH_PRODUCTS;
}

interface FetchProductSuccessAction {
  type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS;
  payload: {
    id: number;
    name: string;
    slug: string;
    description: string;
    full_description: string;
    price: number;
    rating: number;
    image: string;
    use: string;
    ingredients: string;
    stock: number;
    size: number;
    category: string | CategoryState;
  }[];
}

interface FetchProductErrorAction {
  type: ProductActionTypes.FETCH_PRODUCTS_ERROR;
  payload: string;
}

interface FetchProductByIdAction {
  type: ProductActionTypes.FETCH_PRODUCT_BY_ID;
}

interface FetchProductByIdSuccessAction {
  type: ProductActionTypes.FETCH_PRODUCT_BY_ID_SUCCESS;
  payload: {
    id: number;
    name: string;
    slug: string;
    description: string;
    full_description: string;
    price: number;
    rating: number;           
    image: string;            
    use: string;
    ingredients: string;
    stock: number;
    size: number;
    category: string | CategoryState;
    images?: {
      id: number;
      image: string;
      is_main: boolean;
      order: number;
    }[];
  };
}

interface FetchProductByIdErrorAction {
  type: ProductActionTypes.FETCH_PRODUCT_BY_ID_ERROR;
  payload: string;
}

export type ProductAction =
  | FetchProductAction
  | FetchProductErrorAction
  | FetchProductSuccessAction
  | FetchProductByIdAction
  | FetchProductByIdSuccessAction
  | FetchProductByIdErrorAction;