import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import { productReducer } from "./productReducer";
import { authReducer } from "./authReducer";
import cartReducer from '../slices/cartSlice';
import favoriteReducer from '../slices/favoriteSlice';
import blogReducer from "../slices/blogSlice";
import testReducer from '../slices/testSlice';
import latestReducer from '../slices/latestSlice';
import rouletteReducer from '../slices/rouletteSlice';
import orderReducer from '../slices/orderSlice';

export const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    favorites: favoriteReducer,
    blog: blogReducer,
    test: testReducer,
    latest: latestReducer,
    roulette: rouletteReducer,
    orders: orderReducer,
})

export type RootState = ReturnType<typeof rootReducer>