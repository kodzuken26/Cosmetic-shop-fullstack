import type { Dispatch } from "redux"
import { type UserAction, UserActionTypes } from "../../types/user"
import axios from "axios"

const API_URL = 'http://kodzuken.pythonanywhere.com/api/login/'

export const fetchUserProfile = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.FETCH_USERS })
            
            const token = localStorage.getItem('access_token')
            const response = await axios.get(`${API_URL}profile/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            dispatch({
                type: UserActionTypes.FETCH_USERS_SUCCESS, 
                payload: response.data  // данные одного пользователя
            })
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USERS_ERROR,
                payload: 'Произошла ошибка при загрузке профиля'
            })
        }
    }
}