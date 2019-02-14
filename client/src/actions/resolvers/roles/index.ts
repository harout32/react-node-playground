import { apiGetUserPermissions, apiGetRoles, apiGetAllPermissions } from "../../../api";
import { loadRoles, loadPermissions } from '../../roleActions';
import { Dispatch } from "redux";
import { State } from "../../../models";


export const RolesResolver  = () => async (
    dispatch: Dispatch,
    getState: () => State
  ) => {
    try{
    const [roles, permissions] = await Promise.all<any>([apiGetRoles(), apiGetAllPermissions()]);
    dispatch(loadRoles(roles));
    dispatch(loadPermissions(permissions));
    return Promise.resolve(roles);
  }catch(err) {
    return Promise.reject();
  }
  }
