import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { Category } from '../../../type/category';
import { Brand } from '../../../type/brand';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-product-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);
  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(9)]],
    shortDescription: [null, [Validators.required, Validators.minLength(8)]],
    description: [null, [Validators.required, Validators.minLength(5)]],
    Price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
    isFeatured:[false],
    isNewProduct:[false]
  });
  categoryService=inject(CategoryService);
  id!:string
  brandService=inject(BrandService);
  productService=inject(ProductsService);
  categories:Category[]=[];
  brands:Brand[]=[];
  route=inject(Router);
  router=inject(ActivatedRoute)
  isEdit=false
  ngOnInit(){
    this.addImage();
    this.id=this.router.snapshot.params['id'];
    console.log(this.id)
    if(this.id){
      this.productService.getProductsById(this.id).subscribe((result:any)=>{
        console.log(result)
        for(let index=0;index<result.images.length;index++){
          this.addImage();
        }
        this.productForm.patchValue(result);
      })
    }
    else
    {
      this.addImage()
    }
    this.categoryService.getCategories().subscribe((result:any)=>{
      this.categories=result.Category;
      console.log(this.categories)
    })
    this.brandService.getBrands().subscribe((result:any)=>{
      this.brands=result.Brand;
      console.log(this.brands);
    })
  }
  name!:string
  shortDescription!:string
  description!:string
  Price!:string
  discount!:string
  categoryId!:string
  isFeatured!:boolean
  isNewProduct!:boolean

  add() {
  const value = this.productForm.value;
  this.productService.addProducts(
    value
  ).subscribe((result:any)=>{
    alert('Product added successfully');
    this.route.navigate(['admin/products']);
  });
}



  addImage(){
    this.images.push(this.formBuilder.control(null));
  }
  removeImage(){
    this.images.removeAt(this.images.controls.length-1);
  }
  update(){
    console.log("Product form value",this.productForm.value);
    this.productService.updateProduct(this.id,this.productForm.value).subscribe((result:any)=>{
      alert('Product Updated successfully')
      this.route.navigate(['admin/products']);
    });
  }
  get images() {
    return this.productForm.controls['images'] as FormArray;
  }
}
