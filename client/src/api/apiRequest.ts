import { axiosRequest } from './axiosRequest';
import { store } from '../store';
import { message } from 'antd';
const apiRoute = '/api';

function mapDataToResponse(response: any) {
return response.data;
}
function errorHandler (err: any) {
    message.error(err.response.data.message || 'something went wrong!');
}

export const apiRequest = {
    post: async<T>(route: string, reqData: any): Promise<T> => {
            const response: any = await axiosRequest().post(apiRoute + route, reqData).catch(err => {
                errorHandler(err);
                return Promise.reject(err);
            });
            const data = mapDataToResponse(response);
            return Promise.resolve( data );
    },
    get : async<T>(route: string): Promise<T> => {
        const response: any = await axiosRequest().get(apiRoute + route).catch(err => {
            errorHandler(err);
            return Promise.reject(err);
        });
        const data = mapDataToResponse(response);
        return Promise.resolve( data );
    }
}

