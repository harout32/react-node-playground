import { UserActionTypes } from '../enums';
import { Action, LoginResponseModel } from '../models';


type UserAction = Action<UserActionTypes>;

export const userLoginAction = (userData: LoginResponseModel): UserAction => {
    return {
        type: UserActionTypes.login,
        payload: userData
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