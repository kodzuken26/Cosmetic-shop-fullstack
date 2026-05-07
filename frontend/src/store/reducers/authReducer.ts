import { AuthActionTypes } from "../authTypes";
import { type AuthState } from "../../types/auth";

const initialState: AuthState = {
  user: null,
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {

    case AuthActionTypes.LOGIN:
      return { ...state, loading: true, error: null };

    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        access: action.payload.access,
        refresh: action.payload.refresh,
      };

    case AuthActionTypes.LOGIN_ERROR:
      return { ...state, loading: false, error: action.payload };

    case AuthActionTypes.SET_USER:
      return { ...state, user: action.payload };

    case AuthActionTypes.LOGOUT:
      return {
        user: null,
        access: null,
        refresh: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};