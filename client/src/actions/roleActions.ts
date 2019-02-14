import { Action, RoleResponseModel, PermissionsResponseModel } from '../models';
import { RoleActionTypes } from '../enums';

type RoleAction = Action<RoleActionTypes>

export const loadRoles = (roles: RoleResponseModel[]): RoleAction  => ({type: RoleActionTypes.loadRoles, payload: roles});
export const loadPermissions = (permissions: PermissionsResponseModel[] ): RoleAction => ({type: RoleActionTypes.loadPermissions, payload: permissions});
