import { UserState } from './userState';
import { RouterState } from './routerState';
import { RoleState } from './roleState';

export interface State {
    user: UserState;
    router: RouterState;
    role: RoleState;
}
