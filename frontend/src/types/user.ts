export interface UserState {
     data: {
        id: number;
        user: string;
        nickname: string;
        name: string;
        surname: string;
        email: string;
        phone: string;
        gender: string;
    } | null; 
    loading: boolean;
    error: null | string;
}

export enum UserActionTypes{
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
}

interface FetchUsersAction {
    type: UserActionTypes.FETCH_USERS;
}
interface FetchUsersSuccessAction {
    type: UserActionTypes.FETCH_USERS_SUCCESS;
    payload: {
        id: number;
        user: string;
        nickname: string;
        name: string;
        surname: string;
        email: string;
        phone: string;
        gender: string;
    };
}
interface FetchUsersErrorAction {
    type: UserActionTypes.FETCH_USERS_ERROR;
    payload: string;
}

export type UserAction = FetchUsersAction | FetchUsersErrorAction | FetchUsersSuccessAction