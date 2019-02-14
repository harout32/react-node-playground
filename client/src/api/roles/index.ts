import { apiRequest } from '../apiRequest';
import { RoleResponseModel, PermissionsResponseModel } from '../../models';

export const apiGetAllPermissions = () => {
    return apiRequest.get<PermissionsResponseModel[]>('/permission');
}



const route = '/role';

export const apiGetRoles = () => {
    return apiRequest.get<RoleResponseModel[]>(route);
}
