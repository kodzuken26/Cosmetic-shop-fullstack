import type { Dispatch } from 'redux';
import { fetchCart, addToCart, removeFromCart, updateCartItem } from '../slices/cartSlice';

export const cartActions = {
    fetchCart: () => (dispatch: Dispatch) => {
        dispatch(fetchCart() as any);
    },
    addToCart: (product_id: number, quantity?: number) => (dispatch: Dispatch) => {
        dispatch(addToCart({ product_id, quantity }) as any);
    },
    removeFromCart: (item_id: number) => (dispatch: Dispatch) => {
        dispatch(removeFromCart(item_id) as any);
    },
    updateCartItem: (item_id: number, quantity: number) => (dispatch: Dispatch) => {
        dispatch(updateCartItem({ item_id, quantity }) as any);
    },
};