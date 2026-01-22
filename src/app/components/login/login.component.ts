import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formbuilder=inject(FormBuilder);
  loginform=this.formbuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.minLength(5)]]
  })
  authService=inject(AuthService);
  router=inject(Router)
  login(){
    const value=this.loginform.value;
    this.authService.loginUser(value.email!,value.password!).subscribe((result:any)=>{
      alert("Login done successfully");
      localStorage.setItem('token',result.token);
      localStorage.setItem('user',JSON.stringify(result.user))
      this.router.navigateByUrl("/");
    })
    
  }


}
