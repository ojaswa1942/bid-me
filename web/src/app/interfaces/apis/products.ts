import axios, { AxiosInstance } from "axios"
// import { environment } from "src/environments/environment"
// import { InterfaceResponsePromise, successInterfacePromiseResponse } from "../models/interface";
// import { LoginResponse, RegisterResponse } from "../models/responses";

class ProductsAPIs {

    private getClient = (): AxiosInstance => {
        return axios.create({
            baseURL: `/api/products`,
            headers: {
                'content-type': 'application/json',
            }
        });
    };
    
    // public add = async (email: string, password: string): InterfaceResponsePromise<LoginResponse> => {
    //     try {
    //         const client = this.getClient();
    //         const dataResponse = await client.post<LoginResponse>("/add", { email, password });
    //         return successInterfacePromiseResponse<LoginResponse>(dataResponse.data);
    //     } catch(error) {
    //         console.error("Login failed with error:", error);
    //         return { success: false, error: error?.response?.data || "Something went wrong" };
    //     }
    // };

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
