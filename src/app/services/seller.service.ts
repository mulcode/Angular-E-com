import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn= new BehaviorSubject<boolean>(false);
  isloginError = new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(data:signUp){
   return this.http.post('http://localhost:3000/seller', data,{observe:'response'})
   .subscribe((result:any)=>{
    this.isSellerLoggedIn.next(true)
    if(result){
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
    }
   })
  }
  reloadSeller(){
    // if(localStorage.getItem('seller')){
    //   this.isSellerLoggedIn.next(true)
    //   this.router.navigate(['seller-home'])
    // }
  }

  userLogin(data:login){
    console.warn(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result:any)=>{
    console.warn(result);
    if(result && result.body && result.body.length){
      console.warn("user Logged in");
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
    }else{
      console.warn('Login failed');
      this.isloginError.emit(true)      
    }
  })
  }
}
