import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import AuthAPIs from '../interfaces/apis/auth';
import FirebaseAPIs from '../interfaces/firebase/firebase';
import { LoginAuthService, RegisterAuthService } from './models/auth.models';
import { Product } from './models/products.models';
import { ServiceResponse, ServiceResponsePromise } from './models/services.models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  attributes: {
    init: boolean;
    isLoggedIn: boolean;
    uid?: string;
  } = {
    init: true,
    isLoggedIn: false,
  };

  constructor(private firebase: AngularFireDatabase) { 
  };

  getAll = (): ServiceResponse<Observable<Product[]>> => {
    const firebaseInterface = new FirebaseAPIs(this.firebase);
    const authRes = firebaseInterface.listOpenProducts();

    return authRes;
  };

  register = async (name: string, email: string, password: string): ServiceResponsePromise<RegisterAuthService> => {
    const authInterface = new AuthAPIs();
    const authRes = await authInterface.register(name, email, password);
    return authRes;
  };
}
