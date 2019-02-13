export interface RoleState {
    roles: {[key: string]:{name: string, permissions: string[]}};
    permissions: {[key: string]: string; };
}