import { type UserAction, UserActionTypes, type UserState } from "../../types/user"

const initialState: UserState = {
    data: null,
    loading: false,
    error: null,
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USERS:
            return { ...state, loading: true, error: null }
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return { 
                loading: false, 
                error: null, 
                data: action.payload  
            }
        case UserActionTypes.FETCH_USERS_ERROR:
            return { ...state, loading: false, error: action.payload, data: null }
        default:
            return state
    }
}

