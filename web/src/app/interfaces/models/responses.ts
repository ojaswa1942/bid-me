import { Observable } from "rxjs";
import { Product } from "src/app/services/models/products.models";

export type LoginResponse = {
    message: string;
    token: string;
};

export type RegisterResponse = {
    message: string;
    uid: string;
};

export type ProductListResponse = Observable<Product[]>

export type BidResponse = {
    message: string;
    product: Product;
};
