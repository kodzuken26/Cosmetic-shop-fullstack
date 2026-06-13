import type { Dispatch } from "redux"
import { type UserAction, UserActionTypes } from "../../types/user"
// import axios from "axios"
import api from "../../api/api";

// const API_URL = import.meta.env.DEV 
//     ? 'http://127.0.0.1:8000/api/' 
//     : 'https://kodzuken.pythonanywhere.com/api/';


export const fetchUserProfile = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.FETCH_USERS });

      const token = localStorage.getItem("access"); // ← ключ тот же, что в Auth.tsx

      if (!token) {
        throw new Error("Нет токена");
      }

      const response = await api.get("/profile/"); // ← используем api, а не axios

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
// export const fetchUserProfile = () => {
//     return async (dispatch: Dispatch<UserAction>) => {
//         try {
//             dispatch({ type: UserActionTypes.FETCH_USERS })
            
//             const token = localStorage.getItem('access_token')
//             const response = await axios.get(`${API_URL}profile/`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             })
            
//             dispatch({
//                 type: UserActionTypes.FETCH_USERS_SUCCESS, 
//                 payload: response.data  
//             })
//         } catch (e) {
//             dispatch({
//                 type: UserActionTypes.FETCH_USERS_ERROR,
//                 payload: 'Произошла ошибка при загрузке профиля'
//             })
//         }
//     }
// }