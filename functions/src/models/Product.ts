import * as admin from "firebase-admin";
import { AddProductInput, Product as ProductType, ProductModel, UserRef } from "../types/types";
import { realtimeDatabase } from "../utils/config";

export default class Product {
    product?: ProductModel;

    constructor() {
    }

    static load = async (id: string): Promise<Product | null> => {
        const product = await Product.findById(id);
        if (product) {
            const productClass = new Product();
            productClass.product = product;
            return productClass;
        }
        return null;
    }

    static transformResponseToProductModel = (data: { [key: string]: ProductType }): ProductModel => {
        const id = Object.keys(data)[0];
        return {
            ...data[id],
            id,
        };
    };

    static transformAddInputToProductType = (data: AddProductInput, user: UserRef): ProductType => {
        return {
            name: data.name,
            description: data.description || "",
            imageUrl: data.imageUrl || "",
            deadline: data.deadline || 0,
            isOpen: true,
            created: Date.now(),
            owner: user,
            bid: {
                startPrice: data.startPrice || 0,
                currentPrice: data.startPrice || 0,
                bids: 0,
                currentBidder: user,
            },
        };
    };
    
    static findById = async (id: string): Promise<ProductModel | null> => {
        const db = admin.database();
        const ref = db.ref(`${realtimeDatabase.collections.products}/${id}`);
        const product = await ref.once('value');
        if(!product.exists()) return null; 

        return { ...product.val(), id: product.key };
    };

    static findByOwner = async(email: string): Promise<ProductModel[]> => {
        const db = admin.database();
        const ref = db.ref(`${realtimeDatabase.collections.products}`);
        const products = await ref.orderByChild('owner/email').equalTo(email).once('value');
        if(!products.exists()) return []; 
        
        const transformedProducts = Object.entries(products.val())
        .map(([key, val]) => Product.transformResponseToProductModel({
            [key]: val as ProductType}
        ));
        
        console.log(transformedProducts);
        
        return transformedProducts;
    };

    static create = async (productDetails: AddProductInput, userDetails: UserRef): Promise<ProductModel> => {
        const productInput = Product.transformAddInputToProductType(productDetails, userDetails);

        const productsRef = admin.database().ref(realtimeDatabase.collections.products);
        const insertedProduct = await productsRef.push(productInput);
        const insertedProductVal = await insertedProduct.once('value');
        
        return Product.transformResponseToProductModel({ [insertedProductVal.key as string]: insertedProductVal.val() });
    };

    static update = async (id: string, newProduct: ProductModel): Promise<ProductModel> => {
        const productsRef = admin.database().ref(realtimeDatabase.collections.products);
        const updatedProduct = await productsRef.child(id).update(newProduct);
        const updatedProductVal = await updatedProduct.once('value');

        console.log("updatedProductVal", updatedProductVal);
        
        return Product.transformResponseToProductModel({ [updatedProductVal.key as string]: updatedProductVal.val() });
    };

    static updateWithTransaction = async (id: string, fn: (data: ProductType) => ProductType | undefined): Promise<ProductModel> => {
        const productsRef = admin.database().ref(`${realtimeDatabase.collections.products}/${id}`);
        const transactionRes = await productsRef.transaction(fn);
        if(!transactionRes.committed) {
            throw new Error("Transaction failed, could not update value");
        }
        const prodRef = transactionRes.snapshot;
                
        return { ...prodRef.val(), id: prodRef.key };
    };
}
