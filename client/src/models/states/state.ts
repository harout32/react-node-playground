import { UserState } from './userState';
import { RouterState } from './routerState';

export interface State {
    user: UserState;
    router: RouterState;
}
