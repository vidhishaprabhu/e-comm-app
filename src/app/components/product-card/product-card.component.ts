import { Component, inject, Input } from '@angular/core';
import { Product } from '../../type/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  wishlist: Product[] = [];
  wishlistService = inject(WishlistService);
  get sellingPrice() {
    return (
      this.product.Price - (this.product.Price * this.product.discount) / 100
    );
  }

  // addToWishlist(product: Product) {
  //   const wishlistItem = this.wishlistService.wishlist.find(
  //     (item: any) => item.productId === product._id,
  //   );

  //   this.wishlistService.addToWishList(product._id).subscribe((result: any) => {
  //     this.wishlist = result;
  //   });
  // }
  // ngOnInit() {
  //   this.wishlistService.getWishList().subscribe();
  // }

  addToWishlist(product: Product) {
    this.wishlistService.addToWishList(product._id).subscribe((res: any) => {
      console.log('First Item', res);
      const wishlistItem = res;

      this.wishlistService.wishlist = [
        ...(this.wishlistService.wishlist || []),
        wishlistItem,
      ];

      alert('Wishlist added successfully');
    });
  }

  deleteWishlist(product: Product) {
    const wishlistItem = this.wishlistService.wishlist.find(
      (item: any) => item.productId === product._id,
    );

    const wishlist = this.wishlistService
      .deleteFromWishList(product._id)
      .subscribe(() => {
        this.wishlistService.wishlist = this.wishlistService.wishlist.filter(
          (item: any) => item.productId !== product._id,
        );
        alert('Wishlist deleted successfully');
      });
  }
  // isInWishlist(product: Product): boolean {
  //   return this.wishlistService.wishlist.some(
  //     (item: any) => item.productId === product._id,
  //   );
  // }
}
