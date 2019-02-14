import { RoleActionTypes } from '../enums';
import { Action, Reducer } from '../models';
import { RoleState } from '../models/states/roleState';



const defaultState: RoleState = {
    permissions: {},
    roles: {}
}
export const roleReducer: Reducer<RoleState, Action<RoleActionTypes>> 
    = (state: RoleState = defaultState, action: Action<RoleActionTypes>): RoleState => {
        switch (action.type) {
            case RoleActionTypes.loadRoles :
            return {
                ...state,
                roles: action.payload.reduce( (accr:{[key: string]: {name: string; permissions: string[]}}, item: any) => {
                    return {
                        ...accr,
                        [item._id]: {name: item.name, permissions: item.permissions.map((per: any) => per._id)}
                    };
                }, {})
            };
            case RoleActionTypes.loadPermissions :
            return {
                ...state,
                permissions: action.payload.reduce((accr: { [key: string]: string }, per: { _id: string; name: string; }) => {
                    return {...accr, [per._id]: per.name};
                    }, {})
            }
            default :
            return state;
        }
    }