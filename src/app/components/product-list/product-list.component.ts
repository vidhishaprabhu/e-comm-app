import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../type/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Category } from '../../type/category';
import { Brand } from '../../type/brand';
import { BrandService } from '../../services/brand.service';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-product-list',
  imports: [
    ProductCardComponent,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  customerService = inject(CustomerService);
  page: number = 1;
  limit?: number = 2;
  searchTerm: string = '';
  categoryId?: string;
  brandId?: string;
  sortBy: string = 'Price';
  order: 'asc' | 'desc' = 'desc';
  totalPage=0
  totalProducts=0
  products: Product[] = [];
  route = inject(ActivatedRoute);
  categories: Category[] = [];
  brands: Brand[] = [];

  ngOnInit() {
    this.customerService.getCategories().subscribe((result: any) => {
      this.categories = result.Category;
    });
    this.customerService.getBrands().subscribe((result: any) => {
      console.log('Brands', result);
      this.brands = result.Brand;
    });
    this.route.queryParams.subscribe((result: any) => {
      this.searchTerm = result.search || '';
      this.categoryId = result.categoryId || null;
      this.getProducts();
    });
  }

  getProducts() {
    setTimeout(()=>{
      this.customerService
      .getProductListing(
        this.page!,
        this.limit!,
        this.searchTerm!,
        this.categoryId!,
        this.brandId!,
        this.sortBy || 'Price',
        this.order || 'asc',
      )
      .subscribe((result: any) => {
        this.products = result.product;
        this.totalProducts = result.pagination.totalProducts;
        this.totalPage = result.pagination.totalPage;
        console.log('Sorted Products →', this.products);
      });
    },500)
  }
  onSortChange(order: 'asc' | 'desc') {
    this.order = order;
    this.getProducts();
  }
  isNext=true
  pageChange(page:number){
    console.log('PAGE CLICKED →', page);
    this.page=page
    // this.isNext=true
    this.getProducts();
  }
}
