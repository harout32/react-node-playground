import { axiosRequest } from './axiosRequest';
const apiRoute = '/api';

export const apiRequest = {
    post: async<T>(route: string, reqData: any): Promise<T> => {
            const res: any = await axiosRequest.post(apiRoute + route, reqData).catch(err => {
                console.log('error message : ', err);
                return Promise.reject(err);
            });
            console.log('success message : ', res);
            debugger;
            return Promise.resolve( res );
    }
}

