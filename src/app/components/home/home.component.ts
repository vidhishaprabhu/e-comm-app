import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../type/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent,CarouselModule,NgFor,NgIf,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customerService=inject(CustomerService);
  newProduct:Product[]=[];
  featuredProduct:Product[]=[];
  bannerImages:Product[]=[];

  customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  navSpeed: 700,
  nav: true,
  navText: [
    '<span class="owl-prev">&larr;</span>',
    '<span class="owl-next">&rarr;</span>'
  ]
};


  ngOnInit() {
  this.customerService.getNewProduct().subscribe((result: any) => {
    this.newProduct = result;
    console.log('New Products:', this.newProduct);

    const image=this.bannerImages.push(...result);
    console.log("New Product",image)
  });

  
  this.customerService.getFeaturedProduct().subscribe((result: Product[]) => {
    this.featuredProduct = result;
    console.log('Featured Products:', this.featuredProduct);

    this.bannerImages.push(...result.filter(p => p.images && p.images.length > 0));
  });
}

}
