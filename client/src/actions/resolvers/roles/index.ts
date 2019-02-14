import { apiGetUserPermissions, apiGetRoles, apiGetAllPermissions } from "../../../api";
import { setUserPermissions } from "../../userActions";
import { loadRoles, loadPermissions } from '../../roleActions';
import { Dispatch } from "redux";
import { State } from "../../../models";

export const permissionResolver = () => async (
    dispatch: Dispatch,
    getState: () => State
  ) => {
    const permissions = getState().user.permissions;
    if (permissions.length > 0) return Promise.resolve(permissions);
    try {
        const permissions = await apiGetUserPermissions();
        dispatch(setUserPermissions(['asdasd']));
        return Promise.resolve(permissions);
      } catch (err) {
        return Promise.reject();
      }
}

export const RolesResolver  = () => async (
    dispatch: Dispatch,
    getState: () => State
  ) => {
    try{
    const roles = await apiGetRoles();
    dispatch(loadRoles(roles));
    return Promise.resolve(roles);
  }catch(err) {
    return Promise.reject();
  }
  }

  export const AllPermissionsResolver = () => async (
    dispatch: Dispatch,
    getState: () => State
  ) => {
    try {
    const permissions = await apiGetAllPermissions();
    dispatch(loadPermissions(permissions));
    return Promise.resolve(permissions);
    }catch(err) {
      return Promise.reject();
    }
  }