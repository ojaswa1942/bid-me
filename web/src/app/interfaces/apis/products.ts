import axios, { AxiosInstance } from "axios"
import { AddProductInput, Product } from "src/app/services/models/products.models";
import { InterfaceResponsePromise, successInterfacePromiseResponse } from "../models/interface";
import { ProductResponse, LoginResponse, RegisterResponse, ProductBidResponse } from "../models/responses";

class ProductsAPIs {
    private idt: string = "";

    constructor(idToken: string) {
        this.idt = idToken;
    }

    private getClient = (): AxiosInstance => {
        return axios.create({
            baseURL: `/api/products`,
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${this.idt}`,
            }
        });
    };
    
    public bid = async (id: string, price: Number): InterfaceResponsePromise<ProductResponse> => {
        try {
            const client = this.getClient();
            const dataResponse = await client.post<ProductResponse>("/bid", { id, price });
            return successInterfacePromiseResponse<ProductResponse>(dataResponse.data);
        } catch(error) {
            console.error("Bid failed with error:", error);
            return { success: false, error: error?.response?.data || "Something went wrong" };
        }
    };

    public add = async (product: AddProductInput): InterfaceResponsePromise<ProductResponse> => {
        try {
            const client = this.getClient();
            const dataResponse = await client.post<ProductResponse>("/add", product);
            return successInterfacePromiseResponse<ProductResponse>(dataResponse.data);
        } catch(error) {
            console.error("Bid failed with error:", error);
            return { success: false, error: error?.response?.data || "Something went wrong" };
        }
    };

    public getSelfBids = async (): InterfaceResponsePromise<ProductBidResponse> => {
        try {
            const client = this.getClient();
            const dataResponse = await client.get<ProductBidResponse>("/bids");
            return successInterfacePromiseResponse<ProductBidResponse>(dataResponse.data);
        } catch(error) {
            console.error("Bid failed with error:", error);
            return { success: false, error: error?.response?.data || "Something went wrong" };
        }
    };
}

export default ProductsAPIs;
