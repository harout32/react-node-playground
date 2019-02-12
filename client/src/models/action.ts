import { Dispatch } from "redux";

export interface Action<TypeEnum> {
    type: TypeEnum;
    payload: any;
}
export type ActionCreator<T> = (data?: T) => (dispatch: Dispatch) => Promise<any>;