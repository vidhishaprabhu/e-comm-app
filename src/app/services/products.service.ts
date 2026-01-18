import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../type/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);
  constructor() {}

  getProducts() {
    return this.http.get<Product[]>(environment.apiUrl + '/product');
  }
  addProducts(Product:any) {
    return this.http.post(environment.apiUrl + '/product', {
      name: Product.name,
      shortDescription:Product.shortDescription,
      description:Product.description,
      Price:Product.Price,
      discount:Product.discount,
      images:Product.images,
      categoryId:Product.categoryId,
      brandId:Product.brandId
    });
  }
  getProductsById(id: string) {
    return this.http.get<Product>(environment.apiUrl + '/product/' + id);
  }
  updateProduct(id: string, productData: any) {
    return this.http.put(environment.apiUrl + '/product/' + id, productData);
  }
  deleteProducts(id: string) {
    return this.http.delete(environment.apiUrl + '/product/' + id);
  }
}
