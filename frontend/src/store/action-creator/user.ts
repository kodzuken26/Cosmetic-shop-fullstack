import type { Dispatch } from "redux"
import { type UserAction, UserActionTypes } from "../../types/user"
import api from "../../api/api";


export const fetchUserProfile = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USERS });

      const token = localStorage.getItem("access"); 

      if (!token) {
        throw new Error("Нет токена");
      }

      const response = await api.get("/profile/"); 

      dispatch({
        type: UserActionTypes.FETCH_USERS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      console.error(e);
      dispatch({
        type: UserActionTypes.FETCH_USERS_ERROR,
        payload: "Произошла ошибка при загрузке профиля",
      });
    }
  };
};
