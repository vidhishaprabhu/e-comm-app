import { Component, inject } from '@angular/core';
import { Category } from '../../type/category';
import { CategoryService } from '../../services/category.service';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  categories:Category[]=[];
  categoryService=inject(CategoryService);
  ngOnInit(){
    this.categoryService.getCategories().subscribe((result:any)=>{
      this.categories=result.Category;
      console.log(this.categories);
    })
  }

}
