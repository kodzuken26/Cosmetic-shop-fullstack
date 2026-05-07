import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import { productReducer } from "./productReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>