import { Request as ExpressRequest, Response as ExpressResponse } from "express";

export type Context = {
    isAuthenticated: boolean;
    isPrivileged: boolean;
    userEmail: null | string;
}

export interface CustomRequest extends ExpressRequest {
    context?: Context
}

export interface CustomResponse extends ExpressResponse {
}
