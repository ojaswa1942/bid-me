import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import AuthAPIs from '../interfaces/apis/auth';
import { LoginAuthService } from './models/auth.models';
import { ServiceResponse } from './models/services.models';

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
  }

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
        if(this.attributes.init && !["/login", "/register"].includes(this.router.url)) {
          this.router.navigate(["/login"]);
          this.attributes.init = false;
        }
      }
    });
  }

  login = async (email: string, password: string): ServiceResponse<LoginAuthService> => {
    const authInterface = new AuthAPIs();
    const authRes = await authInterface.login(email, password);
    if(authRes.success) {
      try {
        await this.auth.signInWithCustomToken(authRes.data.token);
      } catch (e) {
        console.error("Some error occurred while logging in:",  e);
        return { success: false, error: e };
      }
    }

    return authRes;
  }

  signout = async (): Promise<void> => {
    return this.auth.signOut();
  }
}
