import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../type/product';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customerService=inject(CustomerService);
  newProduct:Product[]=[];
  featuredProduct:Product[]=[];

  ngOnInit(){
    this.customerService.getNewProduct().subscribe((result:any)=>{
      this.newProduct=result;
      console.log(this.newProduct);
    })
    this.customerService.getFeaturedProduct().subscribe((result:any)=>{
      this.featuredProduct=result;
      console.log(this.featuredProduct);
    })
  }

}
