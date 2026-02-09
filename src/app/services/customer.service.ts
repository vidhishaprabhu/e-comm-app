import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../type/product';
import { Category } from '../type/category';
import { Brand } from '../type/brand';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  http = inject(HttpClient);
  constructor() {}
  getNewProduct() {
    return this.http.get<Product[]>(
      environment.apiUrl + '/customer/new-product',
    );
  }
  getFeaturedProduct() {
    return this.http.get<Product[]>(
      environment.apiUrl + '/customer/featured-product',
    );
  }
  getCategories() {
    return this.http.get<Category[]>(
      environment.apiUrl + '/customer/categories',
    );
  }
  getBrands() {
    return this.http.get<Brand[]>(
      environment.apiUrl + '/customer/brands',
    );
  }
  
  getProductListing(
    page: number,
    limit: number,
    search: string,
    categoryId: string,
    brandId: string,
    sortBy?: string,
    order?: 'asc' | 'desc'
  ) {
    let params = new HttpParams().set('page', page).set('limit', limit);

    if (search) {
      params = params.set('search', search); 
    }

    if (categoryId) {
      params = params.set('categoryId', categoryId);
    }

    if (brandId) {
      params = params.set('brandId', brandId);
    }
    if (sortBy) params = params.set('sortBy', sortBy);
    if (order) params = params.set('order', order);

    console.log('QUERY PARAMS', params.toString());

    return this.http.get(environment.apiUrl + '/customer/product-list', {
      params,
    });
  }
  getProductById(id:string){
    return this.http.get(environment.apiUrl+'/customer/product/'+id);
  }

  
}
