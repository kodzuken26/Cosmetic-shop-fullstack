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
                data: action.payload  // action.payload должен быть объектом пользователя
            }
        case UserActionTypes.FETCH_USERS_ERROR:
            return { ...state, loading: false, error: action.payload, data: null }
        default:
            return state
    }
}

// export const userReducer = (state = initialState, action: UserAction): UserState => {
//     switch (action.type) {
//         case UserActionTypes.FETCH_USERS:
//             return { loading: true, error: null, data: [] }
//         case UserActionTypes.FETCH_USERS_SUCCESS:
//             return { loading: false, error: null, data: action.payload }
//         case UserActionTypes.FETCH_USERS_ERROR:
//             return { loading: false, error: action.payload, data: [] }
//         default:
//             return state
//     }
// }