import type { Dispatch } from "redux";
import api from "../../api/api";
import { AuthActionTypes } from "../authTypes";

export const fetchProfile = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: AuthActionTypes.LOGIN });
      const response = await api.get("/profile/");
      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: {
          user: response.data,
          access: localStorage.getItem("access"),
          refresh: localStorage.getItem("refresh"),
        },
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: AuthActionTypes.LOGIN_ERROR,
        payload: "Ошибка загрузки профиля",
      });
    }
  };
};

// import api from "../../api/api";
// import { type Dispatch } from "redux";
// import { AuthActionTypes } from "../authTypes";

// export const login = (email: string, password: string) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       dispatch({ type: AuthActionTypes.LOGIN });

//       const res = await api.post("/auth/login/", {
//         email,
//         password,
//       });

//       localStorage.setItem("access", res.data.access);
//       localStorage.setItem("refresh", res.data.refresh);

//       dispatch({
//         type: AuthActionTypes.LOGIN_SUCCESS,
//         payload: res.data,
//       });

//     } catch (e) {
//       dispatch({
//         type: AuthActionTypes.LOGIN_ERROR,
//         payload: "Ошибка входа",
//       });
//     }
//   };
// };

// export const logout = () => {
//   return (dispatch: Dispatch) => {
//     localStorage.clear();
//     dispatch({ type: AuthActionTypes.LOGOUT });
//   };
// };

// export const fetchProfile = () => {
//   return async (dispatch: Dispatch) => {
//     try {
//       const res = await api.get("/profile/");

//       dispatch({
//         type: AuthActionTypes.SET_USER,
//         payload: res.data,
//       });

//     } catch (e) {
//       dispatch({ type: AuthActionTypes.LOGOUT });
//       localStorage.clear();
//     }
//   };
// };