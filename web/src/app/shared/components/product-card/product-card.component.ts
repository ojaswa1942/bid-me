import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from 'src/app/services/models/products.models';

@Component({
  selector: 'bm-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product?: Product;
  showBid: boolean = false;
  authenticatedUser?: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authenticatedUser = this.authService.attributes.uid;
  }

  handleClick = () => {
    this.showBid = true;
  }

}
