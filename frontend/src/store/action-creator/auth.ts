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
