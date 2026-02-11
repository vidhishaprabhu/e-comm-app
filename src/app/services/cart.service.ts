import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../type/product';
import { CartItem } from '../type/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  http=inject(HttpClient)
  item:CartItem[]=[];
  constructor() { 
    
  }
  init(){
    this.getProduct().subscribe(result=>{
      this.item=result
      console.log("FULL CART RESPONSE:", result);
    })

  }
  getProduct(){
    return this.http.get<CartItem[]>(environment.apiUrl+'/customer/cart');
  }
  addToCart(productId:string,quantity:number){
    return this.http.post(environment.apiUrl+'/customer/cart',{
      productId,
      quantity
    })
  }
  removeFromCart(productId:string){
    return this.http.delete(environment.apiUrl+'/customer/cart/'+productId)
  }
}
