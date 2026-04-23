export interface CategoryState {
    id: number;
    name: string;
    slug: string;
}

export enum CategoryActionTypes {
    FETCH_CATEGORIES = 'FETCH_CATEGORIES',
    FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR'
}

interface FetchCategoryAction{
    type: CategoryActionTypes.FETCH_CATEGORIES
}

interface FetchCategorySuccessAction {
    type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS;
    payload: any[];
}

interface FetchCategoryErrorAction {
    type: CategoryActionTypes.FETCH_CATEGORIES_ERROR;
    payload: string;
}

export type CategoryAction = FetchCategoryAction | FetchCategoryErrorAction | FetchCategorySuccessAction