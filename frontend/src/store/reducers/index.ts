import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import { productReducer } from "./productReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer
})

export type RootState = ReturnType<typeof rootReducer>