import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart } from '../data-type';
import { priceSummery } from './../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  cartData: undefined | cart[];
  priceSummery: priceSummery = {
    price: 0,
    tax: 0,
    delivery: 0,
    discount: 0,
    total: 0,
  };

  constructor(private product: ProductService, private route: Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.priceSummery.price = price;
      this.priceSummery.discount = price / 10;
      this.priceSummery.tax = price / 10;
      this.priceSummery.delivery = 100;
      this.priceSummery.total = price + price / 10 + 100 - price / 5;
      if (!this.cartData.length) {
        this.route.navigate(['/']);
      }
    });
  }

  checkout() {
    this.route.navigate(['checkout']);
  }
  removeToCart(cartId: number | undefined) {
    this.cartData &&
      cartId &&
      this.product.removeToCart(cartId).subscribe((result) => {
        this.loadDetails();
      });
  }
}
