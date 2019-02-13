import { Action, RoleResponseModel } from '../models';
import { RoleActionTypes } from '../enums';

type RoleAction = Action<RoleActionTypes>

export const loadRoles = (roles: RoleResponseModel[]):RoleAction  => ({type: RoleActionTypes.loadRoles, payload: roles})