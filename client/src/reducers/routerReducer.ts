import { RouterState, Action, Reducer } from '../models';
import { RouterActionTypes } from '../enums';



const defaultState: RouterState = {
    isLoading: true
}

export const routerReducer
    = (state: RouterState  = defaultState , action: Action<RouterActionTypes>): RouterState => {
        switch (action.type) {
            case RouterActionTypes.setIsLoading :
            return {isLoading: action.payload};
            default :
            return state
        }
}