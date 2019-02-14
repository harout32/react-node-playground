import { apiLogin, apiGetUserPermissions } from '../../api';
import { LoginResponseModel, State } from '../../models';
import { userLoginAction } from '../userActions';
import { Dispatch } from 'redux';

export const userLoginActionCreator = (
   form: { userName: string;
    password: string;}
) => async (dispatch: Dispatch) => {
  try {
    const userData: LoginResponseModel = await apiLogin(form);
    localStorage.setItem('token', userData.token);
    dispatch(userLoginAction(userData));
    return Promise.resolve(userData);
  } catch (err) {
    return Promise.reject('async login action error');
  }
};
