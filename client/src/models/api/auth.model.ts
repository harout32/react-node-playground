export interface LoginRequestModel {
    userName : string;
    password: string;
}
export interface LoginResponseModel {
    email: string;
    userName: string;
    token: string;
    role: {name: string; permissions: string[]}
    _id: string;
}
