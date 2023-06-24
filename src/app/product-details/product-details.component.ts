import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productQuantity: number = 1;
  productList: undefined | product;
  cartData: product | undefined;
  removeCart = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let getProduct = this.activateRoute.snapshot.paramMap.get('productId');
    getProduct &&
      this.product.getProduct(getProduct).subscribe((result) => {
        this.productList = result;
      });
    let cartData = localStorage.getItem('localCart');
    if (getProduct && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: product) => getProduct == item.id.toString());
      if (items.length) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }

    let user = localStorage.getItem('user');
    if (user) {
      let userId = user && JSON.parse(user).id;
      this.product.getCartList(userId);

      this.product.cartData.subscribe((result) => {
        let item = result.filter(
          (item: product) =>
            getProduct?.toString() === item.productId?.toString()
        );
        if (item.length) {
          this.cartData = item[0];
          this.removeCart = true;
        }
      });
    }
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  addToCart() {
    if (this.productList) {
      this.productList.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddCart(this.productList);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.warn(userId);

        let cartData: cart = {
          ...this.productList,
          productId: this.productList.id,
          userId,
        };
        delete cartData.id;
        this.product.addCarts(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
    } else {
      console.warn('cartData', this.cartData);

      this.cartData &&
        this.product.removeToCart(this.cartData.id).subscribe((result) => {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
        });
    }
    this.removeCart = false;
  }
}
