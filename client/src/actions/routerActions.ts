import { RouterActionTypes } from '../enums';
import { Action } from '../models';

type RouterAction = Action<RouterActionTypes>

export const setRouterIsLoadingAction = (isLoading: boolean): RouterAction => ({type: RouterActionTypes.setIsLoading, payload: isLoading});
