import axios, { AxiosInstance } from "axios"
import { environment } from "src/environments/environment"
import { InterfaceResponse, successInterfaceResponse } from "./models/interface";
import { LoginResponse, RegisterResponse } from "./models/responses";

class AuthAPIs {

    private getClient = (): AxiosInstance => {
        return axios.create({
            baseURL: `/api/auth`,
            headers: {
                'content-type': 'application/json',
            }
        });
    };
    
    public login = async (email: string, password: string): InterfaceResponse<LoginResponse> => {
        try {
            const client = this.getClient();
            const dataResponse = await client.post<LoginResponse>("/login", { email, password });
            return successInterfaceResponse<LoginResponse>(dataResponse.data);
        } catch(error) {
            console.error("Login failed with error:", error);
            return { success: false, error: error?.response?.data || "Something went wrong" };
        }
    }

    public register = async (name: string, email: string, password: string): InterfaceResponse<RegisterResponse> => {
        try {
            const client = this.getClient();
            const dataResponse = await client.post<RegisterResponse>("/register", { name, email, password });
            return successInterfaceResponse<RegisterResponse>(dataResponse.data);
        } catch(error) {
            console.error("Login failed with error:", error);
            return { success: false, error: error?.response?.data || "Something went wrong" };
        }
    }

}

export default AuthAPIs;
