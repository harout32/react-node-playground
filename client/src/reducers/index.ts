import { combineReducers } from 'redux'

import { userReducer } from './userReducer';
import { routerReducer } from './routerReducer';

import { 
    UserState,
    RouterState,
 } from '../models';

interface CombineReducersObject {
    user: UserState;
    router: RouterState;
}

export const reducers = combineReducers<CombineReducersObject>({
    user: userReducer,
    router: routerReducer,
});
