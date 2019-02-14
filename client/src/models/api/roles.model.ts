

export interface RoleResponseModel {
    _id: string;
    name: string;
    permissions: {_id: string; name: string}[]
}
export interface PermissionsResponseModel {
    _id: string;
    name: string;
}