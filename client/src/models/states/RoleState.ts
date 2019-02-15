export interface RoleState {
    roles: RolesStateType;
    permissions: PermissionsStateType;
}
export interface RolesStateType {
    [key: string]: { name: string; permissions: PermissionsStateType };
  }
export interface PermissionsStateType {
    [key: string]: string;
  }