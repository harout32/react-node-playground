import { UserActionTypes } from '../enums';
import { UserState, Action, Reducer } from '../models';



const defaultState: UserState = {
    userName: null,
    email: null,
    role: null,
    isLoading: true,
    isLoggedIn: !!localStorage.getItem('token'),
    permissions: {}
}
export const userReducer: Reducer<UserState, Action<UserActionTypes>> 
    = (state: UserState = defaultState, action: Action<UserActionTypes>): UserState => {
        switch (action.type) {
            case UserActionTypes.login:
            return {
                ...state,
                userName: action.payload.userName,
                email: action.payload.email,
                role: action.payload.role.name,
                isLoggedIn: true,
                isLoading: false,
                permissions: action.payload.role.permissions.reduce((accr: any, item: {_id: string; name: string}) => ({...accr, [item.name]: true}) ,{})
            }
            case UserActionTypes.logout:
            return {
                ...defaultState
            }
            default:
            return state;
        }
};
