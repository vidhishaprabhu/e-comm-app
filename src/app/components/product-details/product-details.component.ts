import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../type/product';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [
    MatButtonModule,
    NgIf,
    MatIconModule,
    ProductCardComponent,
    RouterLink,
    NgFor,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  customerService = inject(CustomerService);
  wishlistService=inject(WishlistService);
  cartService=inject(CartService);
  routes = inject(ActivatedRoute);
  wishlist:Product[]=[];
  product!: Product;
  similarProduct: Product[] = [];
  ngOnInit() {
    this.routes.params.subscribe((result:any)=>{
      this.getProduct(result.id);
    })
    this.getAllProduct();
  }
  getProduct(id: string) {
    this.customerService.getProductById(id).subscribe((result: any) => {
      this.product = result;
      this.getSimilarProducts(this.product.categoryId);
      console.log(this.product);
    });
  }
  getAllProduct(){
    this.wishlistService.getWishList().subscribe((res:any)=>{
      this.wishlist=res;
    });
  }
  getSimilarProducts(categoryId: string) {
    this.customerService
      .getProductListing(1, 10, '', categoryId, '', '', 'asc')
      .subscribe((result: any) => {
        console.log('Similar Product', result);
        this.similarProduct = result.product;
      });
  }
  
  addToWishlist(product: Product) {
    this.wishlistService.addToWishList(product._id).subscribe((res: any) => {
      console.log('First Item', res);
      const wishlistItem = res;
      this.wishlistService.init()

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
        this.wishlistService.init()
        alert('Wishlist deleted successfully');
      });
  }

  get sellingPrice() {
    return (
      this.product.Price - (this.product.Price * this.product.discount) / 100
    );
  }
  addToCart(product: Product) {
    
      this.cartService.addToCart(product._id, 1).subscribe(() => {
        this.cartService.item.push({
          productId: product,
          quantity: 1,
        });

        this.cartService.item = [...this.cartService.item];
        alert('Product added successfully')
      });
   
  }

  

  // isProductInCart(productId: string): boolean {
  //   return (
  //     this.cartService.item?.some(
  //       (item) => item?.productId?._id === productId,
  //     ) ?? false
  //   );
  // }
  
}
