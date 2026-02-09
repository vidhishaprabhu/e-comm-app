import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../type/product';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor() {}
  http = inject(HttpClient);
  wishlist: Product[] = [];
  init() {
    this.getWishList().subscribe((result: any) => {
      this.wishlist = result.data;
    });
  }

  getWishList() {
    return this.http.get(environment.apiUrl + '/customer/wishlist');
  }

  addToWishList(productId: string) {
    return this.http.post(environment.apiUrl + '/wishlist', { productId });
  }

  deleteFromWishList(id: string) {
    return this.http.delete(environment.apiUrl + '/customer/wishlist/' + id);
  }
}
