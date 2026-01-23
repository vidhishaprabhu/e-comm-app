import { Component, inject } from '@angular/core';
import { Category } from '../../type/category';
import { CategoryService } from '../../services/category.service';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-header',
  imports: [MatIconModule,RouterLink,MatButtonModule,MatToolbarModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  categories:Category[]=[];
  customerService=inject(CustomerService);
  authService=inject(AuthService);
  router=inject(Router);
  ngOnInit(){
    this.customerService.getCategories().subscribe((result:any)=>{
      this.categories=result.Category;
      console.log(this.categories);
    })

  }
  onSearch(e:any){
    console.log(e.target.value);
    if(e.target.value){
      this.router.navigateByUrl('products?search='+e.target.value)
    }
  }
  searchCategory(id:string){
    this.router.navigateByUrl("products?categoryId="+id);
  }
  logout(){
    this.authService.logout();
    alert("User logged out successfully");
    this.router.navigateByUrl("/login")
  }
}
