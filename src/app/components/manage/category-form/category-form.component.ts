import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  imports: [FormsModule,MatFormFieldModule, MatInputModule,MatButtonModule,],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  name!:string // for ngModel this variable is used for two way binding
  id!:string
  categoryData!:any
  categoryService=inject(CategoryService);
  router=inject(Router);
  route=inject(ActivatedRoute);
  isEdit=false;
  ngOnInit(){
    this.id=this.route.snapshot.params['id'];
    if(this.id){
      this.isEdit=true;
      this.categoryService.getCategoriesById(this.id).subscribe((result:any)=>{
        console.log(result);
        this.name=result.name
      })
    }
  }
  add(){
    console.log(this.name);
    this.categoryService.addCategories(this.name).subscribe((result:any)=>{
      console.log('result');
      alert("Added successfully")
      this.router.navigate(["/admin/categories"]);
    });
    
  }
  update(){
    console.log(this.name)
    this.categoryData = {
    name: this.name   
  };
    this.categoryService.updateCategory(this.id,this.categoryData).subscribe((result:any)=>{
      console.log(result);
    })
    this.router.navigate(['admin/categories'])
  }

}
