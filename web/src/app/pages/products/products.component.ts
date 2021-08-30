import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/services/models/products.models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'bm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Observable<Product[]> = of([]);

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    const serviceResponse = this.productsService.getAll();
    if(serviceResponse.success) {
      this.products = serviceResponse.data;
    }
  }

}
