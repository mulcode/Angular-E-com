import { Component } from '@angular/core';
import { cart, login, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  showlogin: boolean = true;
  authError: string = '';
  constructor(private user: UserService, private product: ProductService) {}

  ngOnInit(): void {
    this.user.userReload();
  }

  signUp(data: signUp) {
    this.user.userSignUp(data);
  }
  login(data: login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = 'Please enter valid emai or password';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }
  openLogin() {
    this.showlogin = true;
  }
  openSignup() {
    this.showlogin = false;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localcart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addCarts(cartData).subscribe((result) => {
            if (result) {
              console.warn('data stored');
            }
          });
          if (cartDataList.length === index) {
            localStorage.removeItem('localcart');
          }
        }, 5000);
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId); 
    }, 2000);
  }
}
