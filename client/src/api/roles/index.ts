import { apiRequest } from '../apiRequest';
import { RoleResponseModel } from '../../models';


const route = '/role';

export const apiGetRoles = () => {
    return apiRequest.get<RoleResponseModel[]>(route);
}
