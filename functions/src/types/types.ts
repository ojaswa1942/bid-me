import { Request as ExpressRequest, Response as ExpressResponse } from "express";
import models from "../models";

export interface Models {
    User: typeof models.User
}

export interface Context {
    models: Models;
    logger: (...args: any[]) => void;
    isAuthenticated: boolean;
    isPrivileged: boolean;
    userEmail: null | string;
};

export interface CustomRequest extends ExpressRequest {
    context: Context
};

export interface CustomResponse extends ExpressResponse {
};

export type UserModel = {
    id: string;
    name: string;
    email: string;
    password: string;
};
