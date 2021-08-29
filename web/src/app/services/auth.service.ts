import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import AuthAPIs from '../interfaces/apis/auth';
import { LoginAuthService } from './models/auth.models';
import { ServiceResponse } from './models/services.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  attributes: {
    isLoggedIn: boolean;
    uid?: string;
  } = {
    isLoggedIn: false,
  }

  constructor(public auth: AngularFireAuth) { 
    this.auth.onAuthStateChanged(user => {
      if(user) {
        console.log("Hi user!");
        this.attributes.isLoggedIn = true;
        this.attributes.uid = user.uid;
      } else {
        console.log("user who? bye");
        this.attributes = {
          isLoggedIn: false,
          uid: undefined
        };
      }
    });
  }

  login = async (): ServiceResponse<LoginAuthService> => {
    // Call to function to get token
    // use token
    // print id token
    const authInterface = new AuthAPIs();
    const authRes = await authInterface.login("ojaswa1942@gmail.com", "password");
    if(authRes.success) {
      try {
        const userCreds = await this.auth.signInWithCustomToken(authRes.data.token);
        const idToken = await userCreds.user?.getIdToken();
        
      } catch (e) {
        console.error("Some error occurred while logging in:",  e);
        return { success: false, error: e };
      }
    }

    return authRes;
  }
}
