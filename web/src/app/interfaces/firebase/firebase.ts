import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import axios, { AxiosInstance } from "axios"
import { Observable } from "rxjs";
import { Product } from "src/app/services/models/products.models";
import { environment } from "src/environments/environment"
import { InterfaceResponse, InterfaceResponsePromise, successInterfacePromiseResponse, successInterfaceResponse } from "../models/interface";
import { LoginResponse, ProductListResponse, RegisterResponse } from "../models/responses";

class FirebaseAPIs {
    db: AngularFireDatabase;

    constructor(private firebase: AngularFireDatabase) {
        this.db = firebase;
    };

    public listOpenProducts = (): InterfaceResponse<ProductListResponse> => {
        try {
            const products = this.db.list<Product>("products", (ref) => {
                return ref.orderByChild("isOpen").equalTo(true)
            }).valueChanges();
            return successInterfaceResponse<ProductListResponse>(products);
        } catch(error) {
            console.error("Login failed with error:", error);
            return { success: false, error: error?.response?.data || "Something went wrong" };
        }
    };
}

export default FirebaseAPIs;
