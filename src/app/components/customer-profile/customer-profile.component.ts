import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-profile',
  imports: [MatFormFieldModule, MatInputModule,MatButtonModule,NgIf,FormsModule],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent {
  authService=inject(AuthService);
  router=inject(Router);
  isEdit=false;
  id!:string
  user=
  {
    name:this.authService.username,
    email:this.authService.email

  }
  update(){
    this.authService.editProfile(this.user).subscribe((result:any)=>{
      alert("User updated successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.router.navigateByUrl("/login");
    })
  }
  cancel(){
    this.isEdit=false
  }

}
