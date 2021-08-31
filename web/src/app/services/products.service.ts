import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import AuthAPIs from '../interfaces/apis/auth';
import ProductsAPIs from '../interfaces/apis/products';
import FirebaseAPIs from '../interfaces/firebase/firebase';
import { AuthService } from './auth.service';
import { LoginAuthService, RegisterAuthService } from './models/auth.models';
import { AddProductInput, BidProductService, Product } from './models/products.models';
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

  constructor(private firebase: AngularFireDatabase, private authService: AuthService) { 
  };

  getAll = (): ServiceResponse<Observable<Product[]>> => {
    const firebaseInterface = new FirebaseAPIs(this.firebase);
    const authRes = firebaseInterface.listOpenProducts();

    return authRes;
  };

  bid = async (productId: string, price: Number): ServiceResponsePromise<BidProductService> => {
    const idtTokenRes = await this.authService.getIdToken();
    if(!idtTokenRes.success) return idtTokenRes;

    const productsInterface = new ProductsAPIs(idtTokenRes.data);
    const authRes = await productsInterface.bid(productId, price);
    return authRes;
  };

  add = async (product: AddProductInput): ServiceResponsePromise<BidProductService> => {
    const idtTokenRes = await this.authService.getIdToken();
    if(!idtTokenRes.success) return idtTokenRes;

    const productsInterface = new ProductsAPIs(idtTokenRes.data);
    const authRes = await productsInterface.add(product);
    return authRes;
  };
}
