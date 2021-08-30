import axios, { AxiosInstance } from "axios"
import { InterfaceResponsePromise, successInterfacePromiseResponse } from "../models/interface";
import { LoginResponse, RegisterResponse } from "../models/responses";

class AuthAPIs {

    private getClient = (): AxiosInstance => {
        return axios.create({
            baseURL: `/api/auth`,
            headers: {
                'content-type': 'application/json',
            }
        });
    };
    
    public login = async (email: string, password: string): InterfaceResponsePromise<LoginResponse> => {
        try {
            const client = this.getClient();
            const dataResponse = await client.post<LoginResponse>("/login", { email, password });
            return successInterfacePromiseResponse<LoginResponse>(dataResponse.data);
        } catch(error) {
            console.error("Login failed with error:", error);
            return { success: false, error: error?.response?.data || "Something went wrong" };
        }
    }

    public register = async (name: string, email: string, password: string): InterfaceResponsePromise<RegisterResponse> => {
        try {
            const client = this.getClient();
            const dataResponse = await client.post<RegisterResponse>("/register", { name, email, password });
            return successInterfacePromiseResponse<RegisterResponse>(dataResponse.data);
        } catch(error) {
            console.error("Register failed with error:", error);
            return { success: false, error: error?.response?.data || "Something went wrong" };
        }
    }

}

export default AuthAPIs;
