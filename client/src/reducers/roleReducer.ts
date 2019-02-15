import { RoleActionTypes } from '../enums';
import { Action, Reducer } from '../models';
import { RoleState, RolesStateType, PermissionsStateType } from '../models/states/roleState';



const defaultState: RoleState = {
  permissions: {},
  roles: {}
};
export const roleReducer: Reducer<RoleState, Action<RoleActionTypes>> = (
  state: RoleState = defaultState,
  action: Action<RoleActionTypes>
): RoleState => {
  switch (action.type) {
    case RoleActionTypes.loadRoles:
      return {
        ...state,
        roles: action.payload.reduce((accr: RolesStateType, item: any) => {
          return {
            ...accr,
            [item._id]: {
              name: item.name,
              permissions: item.permissions.reduce(
                (accr: PermissionsStateType, per: any) => {
                  return { ...accr, [per._id]: per.name };
                },
                {}
              )
            }
          };
        }, {})
      };
    case RoleActionTypes.loadPermissions:
      return {
        ...state,
        permissions: action.payload.reduce(
          (
            accr: { [key: string]: string },
            per: { _id: string; name: string }
          ) => {
            return { ...accr, [per._id]: per.name };
          },
          {}
        )
      };
      case RoleActionTypes.updateRolePermissions:
      return {
        ...state,
        roles: {
          ...state.roles,
          [action.payload.roleId] : {
            name: state.roles[action.payload.roleId].name,
            permissions: action.payload.permissions.reduce(
              (accr: PermissionsStateType, per: any) => {
                return { ...accr, [per._id]: per.name };
              },
              {}
            )
          }
        }
      }
    default:
      return state;
  }
};
