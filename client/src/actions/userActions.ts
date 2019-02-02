import { UserActionTypes } from '../enums';
import { Action } from '../models';


type UserAction = Action<UserActionTypes>;

export const loginAction = (userName: string): UserAction => {
    return {
        type: UserActionTypes.login,
        payload: {userName}
    };
}
export const loadingAction = () => {}