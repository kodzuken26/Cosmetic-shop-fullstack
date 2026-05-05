import type { Dispatch } from "redux"
import axios from "axios"
import { ProductActionTypes, type ProductAction } from "../../types/product"

const API_URL = import.meta.env.DEV 
    ? 'http://127.0.0.1:8000/api/' 
    : 'https://kodzuken.pythonanywhere.com/api/';

export const fetchProducts = () => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            dispatch({ type: ProductActionTypes.FETCH_PRODUCTS })
            const response = await axios.get(`${API_URL}products/`)
            setTimeout(() => {
                dispatch({type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS, payload: response.data})
            }, 500)
        } catch (e) {
            dispatch({
                type: ProductActionTypes.FETCH_PRODUCTS_ERROR,
                payload: 'Произошла ошибка при загрузке товаров'
            })
        }
    }
}

export const fetchProductById = (id: number) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            dispatch({ type: ProductActionTypes.FETCH_PRODUCT_BY_ID });
            const response = await axios.get(`${API_URL}products/${id}/`);
            dispatch({
                type: ProductActionTypes.FETCH_PRODUCT_BY_ID_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: ProductActionTypes.FETCH_PRODUCT_BY_ID_ERROR,
                payload: 'Ошибка при загрузке товара'
            });
        }
    };
};