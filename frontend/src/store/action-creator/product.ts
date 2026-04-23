import type { Dispatch } from "redux"
import axios from "axios"
import { ProductActionTypes, type ProductAction } from "../../types/product"

export const fetchProducts = () => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try {
            dispatch({ type: ProductActionTypes.FETCH_PRODUCTS })
            const response = await axios.get('http://kodzuken.pythonanywhere.com/api/products/')
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
            const response = await axios.get(`https://kodzuken.pythonanywhere.com/api/products/${id}/`);
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