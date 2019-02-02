import { combineReducers } from 'redux'

import { userReducer } from './userReducer';
import { 
    UserState,
    RouterState,
 } from '../models';
import { routerReducer } from './routerReducer';

interface CombineReducersObject {
    user: UserState;
    router: RouterState;
}

export const reducers = combineReducers<CombineReducersObject>({
    user: userReducer,
    router: routerReducer
});
