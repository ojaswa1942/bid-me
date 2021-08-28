import { Request as ExpressRequest, Response as ExpressResponse } from "express";
import models from "../models";

export interface Models {
    User: typeof models.User
    Product: typeof models.Product
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

export type UserRef = {
    uid: string;
    email: string;
}

export type BidDetails = {
    startPrice: number;
    currentPrice: number;
    currentBidder: UserRef;
    bids: number;
}
export interface Product {
    name: string;
    description: string;
    imageUrl: string;
    isOpen: boolean;
    bid: BidDetails;
    created: number;
    deadline: number;
    owner: UserRef;
} 

export interface ProductModel extends Product {
    id: string;
};

export type AddProductInput = {
    name: string;
    description: string;
    imageUrl: string;
    startPrice: number;
    deadline: number;
}

export type BidInput = {
    id: string;
    price: number;
}
