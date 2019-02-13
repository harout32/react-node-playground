import { combineReducers } from 'redux'

import { userReducer } from './userReducer';
import { routerReducer } from './routerReducer';
import { roleReducer } from './roleReducer';

import { 
    UserState,
    RouterState,
    RoleState
    
 } from '../models';

interface CombineReducersObject {
    user: UserState;
    router: RouterState;
    role: RoleState
}

export const reducers = combineReducers<CombineReducersObject>({
    user: userReducer,
    router: routerReducer,
    role: roleReducer
});
