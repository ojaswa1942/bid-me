import axios, { AxiosInstance } from "axios"
import { Product } from "src/app/services/models/products.models";
import { InterfaceResponsePromise, successInterfacePromiseResponse } from "../models/interface";
import { BidResponse, LoginResponse, RegisterResponse } from "../models/responses";

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
    
    public bid = async (id: string, price: Number): InterfaceResponsePromise<BidResponse> => {
        try {
            const client = this.getClient();
            const dataResponse = await client.post<BidResponse>("/bid", { id, price });
            return successInterfacePromiseResponse<BidResponse>(dataResponse.data);
        } catch(error) {
            console.error("Bid failed with error:", error);
            return { success: false, error: error?.response?.data || "Something went wrong" };
        }
    };

    // public bid = async (name: string, email: string, password: string): InterfaceResponsePromise<RegisterResponse> => {
    //     try {
    //         const client = this.getClient();
    //         const dataResponse = await client.post<RegisterResponse>("/bid", { name, email, password });
    //         return successInterfacePromiseResponse<RegisterResponse>(dataResponse.data);
    //     } catch(error) {
    //         console.error("Register failed with error:", error);
    //         return { success: false, error: error?.response?.data || "Something went wrong" };
    //     }
    // };

}

export default ProductsAPIs;
