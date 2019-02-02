import { UserActionTypes } from '../enums';
import { UserState, Action, Reducer } from '../models';



const defaultState: UserState = {
    userName: null,
    isLoading: true,
    isLoggedIn: true,
}
export const userReducer: Reducer<UserState, Action<UserActionTypes>> 
    = (state: UserState = defaultState, action: Action<UserActionTypes>): UserState => {

        switch (action.type) {
            case UserActionTypes.login:
            return {
                ...state,
                userName: action.payload.userName,
                isLoggedIn: true,
                isLoading: false,
            }
            case UserActionTypes.logout:
            return {
                ...defaultState
            }
            default:
            return state;
        }
};
