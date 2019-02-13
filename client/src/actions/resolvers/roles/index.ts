import { apiGetUserPermissions, apiGetRoles } from "../../../api";
import { setUserPermissions } from "../../userActions";
import { loadRoles } from '../../roleActions';
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
      } catch (err) {}
}


export const RolesResolver  = () => async (
    dispatch: Dispatch,
    getState: () => State
  ) => {
      debugger;
    const roles = await apiGetRoles();
    dispatch(loadRoles(roles));
    return Promise.resolve(roles);
  }