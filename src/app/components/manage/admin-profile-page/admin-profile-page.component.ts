import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-profile-page',
  imports: [MatFormFieldModule, MatInputModule,MatButtonModule,NgIf,FormsModule],
  templateUrl: './admin-profile-page.component.html',
  styleUrl: './admin-profile-page.component.scss'
})
export class AdminProfilePageComponent {
  authService=inject(AuthService)
  router=inject(Router)
  user={
    name:this.authService.username,
    email:this.authService.email
  }
  isEdit=false
  update(){
    this.authService.editProfile(this.user).subscribe((result:any)=>{
      alert("Admin Updated successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.router.navigateByUrl("/login");
    })

  }
  cancel(){
    this.isEdit=false;
  }

}
