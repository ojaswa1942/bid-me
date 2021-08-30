import { InterfaceResponse, InterfaceResponsePromise, successInterfacePromiseResponse, successInterfaceResponse } from "src/app/interfaces/models/interface";

export type ServiceResponsePromise<T> = InterfaceResponsePromise<T>;
export type ServiceResponse<T> = InterfaceResponse<T>;

export const successServicePromiseResponse = successInterfacePromiseResponse;

export const successServiceeResponse = successInterfaceResponse;
