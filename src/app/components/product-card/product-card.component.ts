import { Component, inject, Input } from '@angular/core';
import { Product } from '../../type/product';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

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
  cartService = inject(CartService);
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
  
  addToCart(product: Product) {
    
      this.cartService.addToCart(product._id, 1).subscribe(() => {
        this.cartService.item.push({
          productId: product,
          quantity: 1,
        });

        this.cartService.item = [...this.cartService.item];
      });
    // } else {
    //   this.cartService.removeFromCart(product._id).subscribe(() => {
    //     this.cartService.item = this.cartService.item.filter(
    //       (item) => item.productId._id !== product._id,
    //     );
    //     alert('Item from cart removed successfully');
    //   });
    // }
  }
  removeFromCart(){
    this.cartService.removeFromCart(this.product._id).subscribe((result:any)=>{
      alert("Item from cart removed successfully");
    })
  }

  

  // isProductInCart(productId: string): boolean {
  //   return (
  //     this.cartService.item?.some(
  //       (item) => item?.productId?._id === productId,
  //     ) ?? false
  //   );
  // }
}
