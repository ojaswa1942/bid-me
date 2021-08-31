import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddProductInput } from 'src/app/services/models/products.models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'bm-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  formError: string = "";
  loading = false;
  showAck = "";
  minDeadlineLimit: string = ""

  constructor(private productsService: ProductsService ,private router: Router) { }

  ngOnInit(): void {
    const date = new Date();
    date.setSeconds(0, 0);
    this.minDeadlineLimit = date.toISOString().replace(/:00.000Z/, "");
  }

  onSubmit = async (e: Event, product: AddProductInput) => {
    e.preventDefault();
    this.formError = "";

    this.loading = true;
    console.log("product add", product);
    const addRes = await this.productsService.add(product);
    this.loading = false;

    if(addRes.success) {
      this.showAck = addRes.data.message;
      window.setTimeout(() => this.router.navigate(["/", "products"]), 3000);
    } else {
      this.formError = addRes.error;
    }
  };
}
