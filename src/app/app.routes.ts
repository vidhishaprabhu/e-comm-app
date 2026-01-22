import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    canActivate:[authGuard]
  },
  {
    path:"admin/categories",
    component:CategoriesComponent,
    canActivate:[authGuard]
  },
  {
    path:"admin/categories/add",
    component:CategoryFormComponent,
    canActivate:[authGuard]
  },
  {
    path:"admin/categories/:id",
    component:CategoryFormComponent,
    canActivate:[authGuard]
  },
  {
    path:"admin/brands",
    component:BrandsComponent,
    canActivate:[authGuard]
  },
  {
    path:"admin/brands/add",
    component:BrandFormComponent,
    canActivate:[authGuard]
  },
  {
    path:"admin/brands/:id",
    component:BrandFormComponent,
    canActivate:[authGuard]
  },
  {
    path:"admin/products",
    component:ProductsComponent,
    canActivate:[authGuard]
  },
  {
    path:"admin/products/add",
    component:ProductFormComponent,
    canActivate:[authGuard]
  },
  {
    path:"admin/products/:id",
    component:ProductFormComponent,
    canActivate:[authGuard]
  },
  {
    path:"products",
    component:ProductListComponent,
    canActivate:[authGuard]
  },
  {
    path:"product/:id",
    component:ProductDetailsComponent,
    canActivate:[authGuard]
  },
  {
    path:"register",
    component:RegisterComponent,
  },
  {
    path:"login",
    component:LoginComponent
  }
];
