import { apiLogin, apiGetUserPermissions } from '../../api';
import { LoginResponseModel } from '../../models';
import { userLoginAction, setUserPermissions } from '../userActions';
import { Dispatch } from 'redux';

export const userLoginActionCreator = (
  userName: string,
  password: string
) => async (dispatch: Dispatch) => {
  try {
    const userData: LoginResponseModel = await apiLogin({ userName, password });
    localStorage.setItem('token', userData.token);
    dispatch(userLoginAction(userName));
    return Promise.resolve(userData);
  } catch (err) {
    return Promise.reject('async login action error');
  }
};
export const GetUserPermissionsActionCreator = () => async (
  dispatch: Dispatch
) => {
  try {
    const permissions = await apiGetUserPermissions();
    dispatch(setUserPermissions(permissions));
    return Promise.resolve(permissions);
  } catch (err) {}
};
