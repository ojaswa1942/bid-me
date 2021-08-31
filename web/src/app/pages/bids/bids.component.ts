import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MyBidProducts } from 'src/app/services/models/products.models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'bm-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss']
})
export class BidsComponent implements OnInit {
  productBids: MyBidProducts =[];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.fetchBids();
  }

  fetchBids = async (): Promise<void> => {
    const serviceResponse = await this.productsService.getBids();
    if(serviceResponse.success) {
      this.productBids = serviceResponse.data;
    }
  };
};
