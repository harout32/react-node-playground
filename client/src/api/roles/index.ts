import { apiRequest } from '../apiRequest';
import { RoleResponseModel, PermissionsResponseModel } from '../../models';

export const apiGetAllPermissions = () => {
    return apiRequest.get<PermissionsResponseModel[]>('/permission');
}



const route = '/role';

export const apiGetRoles = () => {
    return apiRequest.get<RoleResponseModel[]>(route);
}

export const apiDeleteRolesPermissions = (roleId: string, permissions: string[]) => {
    return apiRequest.put<RoleResponseModel>(route + `/${roleId}/permission`, permissions);
}

export const apiAddRolesPermissions = (roleId: string, permissions: string[]) => {
    return apiRequest.post<RoleResponseModel>(route + `/${roleId}/permission`, permissions);
}
