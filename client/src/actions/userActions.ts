import { UserActionTypes } from '../enums';
import { Action } from '../models';


type UserAction = Action<UserActionTypes>;

export const userLoginAction = (userName: string): UserAction => {
    return {
        type: UserActionTypes.login,
        payload: {userName}
    };
}
export const userLogoutAction = (): UserAction => {
    return {
        type: UserActionTypes.logout,
        payload: null,
    }
}

export const setUserPermissions = (permissions: string[]) => {
    return {
        type: UserActionTypes.setUserPermissions,
        payload: permissions
    };
};
export const loadingAction = () => {}