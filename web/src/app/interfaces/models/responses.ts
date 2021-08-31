import { Observable } from "rxjs";
import { MyBidProducts, Product } from "src/app/services/models/products.models";

export type LoginResponse = {
    message: string;
    token: string;
};

export type RegisterResponse = {
    message: string;
    uid: string;
};

export type ProductListResponse = Observable<Product[]>

export type ProductResponse = {
    message: string;
    product: Product;
};

export type ProductBidResponse = {
    message: string;
    bids: MyBidProducts;
};
