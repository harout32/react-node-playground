import { apiRequest } from '../apiRequest';

import { LoginRequestModel, LoginResponseModel } from '../../models';

const route = '/auth';

export const apiLogin =  (form: LoginRequestModel): Promise <LoginResponseModel> => {
    return apiRequest.post(route+ '/login', form);
}
