import { apiDeleteRolesPermissions, apiAddRolesPermissions } from '../../api';
import { Dispatch } from 'redux';
import { updateRolePermissions } from '../roleActions';

export const roleDeletePermissionsActionCreator = (roleId: string, permissions: string[]) => async (dispatch: Dispatch) => {
  try {
    const data = await apiDeleteRolesPermissions(roleId, permissions);
    dispatch(updateRolePermissions(data._id, data.permissions));
    return Promise.resolve(data);
  }catch(e) {
    return Promise.reject('async login action error');
  }
}

export const roleAddPermissionsActionCreator = (roleId: string, permissions: string[]) => async (dispatch: Dispatch) => {
    try {
      const data = await apiAddRolesPermissions(roleId, permissions);
      dispatch(updateRolePermissions(data._id, data.permissions));
      return Promise.resolve(data);
    }catch(e) {
        return Promise.reject('async login action error');
    }
  }