import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../type/cartItem';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../type/product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-shoppingcart',
  imports: [MatButtonModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.scss',
})
export class ShoppingcartComponent {
  cartService = inject(CartService);
  item: CartItem[] = [];
  product!: Product;

  ngOnInit() {
    this.getAllItems();
  }
  getAllItems() {
    this.cartService.getProduct().subscribe((res: any) => {
      console.log('API Response:', res);

      this.cartService.item = res.items;
    });
  }

  get cartItems() {
    return this.cartService.item;
  }
  getItemTotal(item: any): number {
    const discountedPrice =
      item.productId.Price -
      (item.productId.Price * item.productId.discount) / 100;
    return discountedPrice * item.quantity;
  }

  // Get total for the entire cart
  getCartTotal(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + this.getItemTotal(item),
      0,
    );
  }

  increaseItem(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe((result: any) => {
      this.getAllItems();
    });
  }

  roundPrice(price: number): number {
    return Math.round(price);
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId).subscribe({
      next: (result: any) => {
        alert('Item removed successfully from cart');
        this.cartService.item = this.cartService.item.filter(
          (item) => item.productId._id !== productId,
        );
        this.getAllItems();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to remove item from cart');
      },
    });
  }


}
