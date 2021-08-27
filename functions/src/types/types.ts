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
    uid: null | string;
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

export type LoginArgs = {
    email: string;
    password: string;
};

export type SignupArgs = {
    name: string;
    email: string;
    password: string;
};

type SuccessResponse = {
    success: true;
    body: SuccessBody
}
interface SuccessBody {
    message: string;
    [key: string]: any;
}
type FailureResponse = {
    success: false;
    error: string | Error;
}

export type ServiceResponse = SuccessResponse | FailureResponse;
