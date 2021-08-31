import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/services/models/products.models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'bm-product-bid',
  templateUrl: './product-bid.component.html',
  styleUrls: ['./product-bid.component.scss']
})
export class ProductBidComponent implements OnInit {
  @Input() product?: Product;
  @Output() toggleShowBid = new EventEmitter<void>();

  Number = Number;
  formError = ""

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
  }

  handleTick = async (price: number) => {
    if( this.product && price > (this.product?.bid.currentPrice as number)) {
      this.formError = "";
      const response = await this.productService.bid(this.product.id, price);
      if(response.success) {
        this.toggleShowBid.emit();
      } else {
        this.formError = response.error;
      }
    } else this.formError = "Kindly enter price more than the current bid.";
  }

}
