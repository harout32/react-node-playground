

export interface RoleResponseModel {
    _id: string;
    name: string;
    permissions: {_id: string; name: string}[]
}