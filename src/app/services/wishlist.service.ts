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
   return this.getWishList().subscribe((result: any) => {
      return this.wishlist = result.wishlist.map((item: any) => item.productId);

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
