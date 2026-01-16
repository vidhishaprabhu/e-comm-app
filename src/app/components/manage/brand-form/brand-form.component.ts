import { Component, inject } from '@angular/core';
import { BrandService } from '../../../services/brand.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-brand-form',
  standalone:true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
  name!:string;
  id!:string;
  brandData!:any;
  isEdit=false;
  brandService=inject(BrandService);
  router=inject(Router)
  route=inject(ActivatedRoute);
  ngOnInit(){
    this.id=this.route.snapshot.params['id']
    if(this.id){
      this.isEdit=true;
      this.brandService.getBrandsById(this.id).subscribe((result:any)=>{
        console.log(result);
        this.name=result.name;
      })
    }


    

  }
  add(){
    this.brandService.addBrands(this.name).subscribe((result:any)=>{
      alert("Brand added successfully");
      this.name='';
    })
  }
  update(){
    this.brandData={
      name:this.name

    }
    this.brandService.updateBrand(this.id,this.brandData).subscribe((result:any)=>{
      console.log(result);
      alert("Brand updated successfully");
      this.router.navigate(['admin/brands']);
    })
  }

}

