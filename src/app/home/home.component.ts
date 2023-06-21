import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  popularProduct: undefined | product[]
  trendyProducts:undefined| product[]

  constructor(private product:ProductService){}

  ngOnInit():void{
    this.product.productAdd().subscribe((data)=>{
      console.warn(data);
      this.popularProduct = data;
    })
    this.product.trendyProduct().subscribe((data)=>{
      this.trendyProducts = data
    })
  }
}
