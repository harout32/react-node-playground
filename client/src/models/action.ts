export interface Action<TypeEnum> {
    type: TypeEnum;
    payload: any;
}
