import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
   constructor(private seller:SellerService, private router:Router){}

   ngOnInit():void{
    this.seller.reloadSeller()
   }

 showLogin = false;
 authError:string ='';

  signUp(data:signUp):void{
    this.seller.userSignUp(data)
  }
  login(data:signUp):void{
    this.authError = "";
  this.seller.userLogin(data)
  this.seller.isloginError.subscribe((isError)=>{
    if(isError){
     this.authError = "Email or Password is incorrect"
    }
  })
  }
  openLogin(){
    this.showLogin = true
  }
  openSignUp(){
    this.showLogin = false
  }
}
