import axios from 'axios';

export const axiosRequest = () => axios.create({
    baseURL: 'http://localhost:3000',
    headers: {'content-type': 'application/json',
                'Authorization': localStorage.getItem('token')
        }
});
