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
    isLoggedIn: boolean;
    uid?: string;
  } = {
    isLoggedIn: false,
  }

  constructor(private auth: AngularFireAuth, private router: Router) { 
    this.auth.onAuthStateChanged(user => {
      if(user) {
        this.attributes.isLoggedIn = true;
        this.attributes.uid = user.uid;
      } else {
        this.attributes = {
          isLoggedIn: false,
          uid: undefined
        };
        this.router.navigate(["/login"]);
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
