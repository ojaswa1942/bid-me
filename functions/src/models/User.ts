import * as admin from "firebase-admin";
import { BidInput, SignupArgs, UserModel } from "../types/types";
import { realtimeDatabase } from "../utils/config";

export default class User {
    user?: UserModel;

    constructor() {
    }

    static load = async (id: string): Promise<User | null> => {
        const user = await User.findOneById(id);
        if (user) {
            const userClass = new User();
            userClass.user = user;
            return userClass;
        }
        return null;
    }

    static transformResponseToUserModel = (data: { [key: string]: UserModel }): UserModel => {
        const id = Object.keys(data)[0];
        return {
            ...data[id],
            id,
        };
    };
    
    static findOneById = async (id: string): Promise<UserModel | null> => {
        const db = admin.database();
        const ref = db.ref(`${realtimeDatabase.collections.users}/${id}`);
        const user = await ref.once('value');
        console.log(user);
        if(!user.exists()) return null; 
        
        return User.transformResponseToUserModel(user.val());
    };

    static findOneByEmail = async(email: string): Promise<UserModel | null> => {
        const db = admin.database();
        const ref = db.ref(`${realtimeDatabase.collections.users}`);
        const user = await ref.orderByChild('email').equalTo(email).limitToFirst(1).once('value');
        
        if(!user.exists()) return null; 

        return User.transformResponseToUserModel(user.val());
    };

    static create = async (userDetails: SignupArgs): Promise<string> => {
        const usersRef = admin.database().ref(realtimeDatabase.collections.users);
        const insertedUser = await usersRef.push({
            ...userDetails,
            bids: {},
        });
        
        return insertedUser.key as string;
    };

    static addBid = async (userId: string, bid: BidInput): Promise<boolean> => {
        const userRef = admin.database().ref(`${realtimeDatabase.collections.users}/${userId}`);
        try{
            const res = await userRef.child('bids').push({ productId: bid.id, price: bid.price });
            if(res.key) return true;
            return false;
        } catch(error) {
            throw new Error("Could not add bid to user");            
        }
    };
}
