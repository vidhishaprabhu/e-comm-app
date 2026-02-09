import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../type/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlists',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './wishlists.component.html',
  styleUrl: './wishlists.component.scss',
})
export class WishlistsComponent {
  wishlistService = inject(WishlistService);
  wishlist: Product[] = [];
  ngOnInit() {
    this.wishlistService.init();
    this.loadWishlist();
  }
  loadWishlist() {
    this.wishlistService.getWishList().subscribe((res: any) => {
      this.wishlist = res.wishlist.map((w: any) => w.productId);
    });
  }
}
