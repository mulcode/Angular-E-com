import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  constructor(private activateRoute:ActivatedRoute){}

  ngOnInit():void{
    let getId = this.activateRoute.snapshot.paramMap.get('productId');
   
    
  }
}
