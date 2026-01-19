import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../type/product';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http=inject(HttpClient)
  constructor() {

  }
  getNewProduct(){
    return this.http.get<Product[]>(environment.apiUrl+'/customer/new-product');
  }
  getFeaturedProduct(){
    return this.http.get<Product[]>(environment.apiUrl+'/customer/featured-product');
  }

}
