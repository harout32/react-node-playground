import { RoleActionTypes } from '../enums';
import { Action, Reducer } from '../models';
import { RoleState } from '../models/states/RoleState';



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
            default :
            return state;
        }
    }