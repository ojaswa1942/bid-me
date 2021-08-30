import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import AuthAPIs from '../interfaces/apis/auth';
import { LoginAuthService, RegisterAuthService } from './models/auth.models';
import { ServiceResponse, ServiceResponsePromise, successServicePromiseResponse } from './models/services.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  attributes: {
    init: boolean;
    isLoggedIn: boolean;
    uid?: string;
  } = {
    init: true,
    isLoggedIn: false,
  };

  constructor(private auth: AngularFireAuth, private router: Router) { 
    this.auth.onAuthStateChanged(user => {
      if(user) {
        this.attributes.isLoggedIn = true;
        this.attributes.uid = user.uid;

        if(this.attributes.init && ["/login", "/register"].includes(this.router.url)) {
          this.router.navigate(["/", "products"]);
          this.attributes.init = false;
        }
      } else {
        this.attributes = {
          ...this.attributes,
          isLoggedIn: false,
          uid: undefined
        };
        if(!["/login", "/register"].includes(this.router.url)) {  // also covers init case 
          this.router.navigate(["/login"]);
        }
      }
    });
  };

  login = async (email: string, password: string): ServiceResponsePromise<LoginAuthService> => {
    const authInterface = new AuthAPIs();
    const authRes = await authInterface.login(email, password);
    if(authRes.success) {
      try {
        await this.auth.signInWithCustomToken(authRes.data.token);
        const idt = await this.auth.idToken.toPromise()
        console.log("idt", idt);
      } catch (e) {
        console.error("Some error occurred while logging in:",  e);
        return { success: false, error: e };
      }
    }

    return authRes;
  };

  signout = async (): Promise<void> => {
    return this.auth.signOut();
  };

  register = async (name: string, email: string, password: string): ServiceResponsePromise<RegisterAuthService> => {
    const authInterface = new AuthAPIs();
    const authRes = await authInterface.register(name, email, password);
    return authRes;
  };

  getIdToken = async (): ServiceResponsePromise<string> => {
    try {
      const user = await this.auth.currentUser;
      if(!user) return {
        success: false,
        error: "User not authenticated",
      };

      const idt = await user.getIdToken();
      return successServicePromiseResponse<string>(idt);
    } catch(e) {
      console.log("COuld not get id Token", e);
      return { success: false, error: e };
    }
  };
}
