import { UserState } from './userState';
import { RouterState } from './routerState';
import { RoleState } from './RoleState';

export interface State {
    user: UserState;
    router: RouterState;
    roles: RoleState;
}
