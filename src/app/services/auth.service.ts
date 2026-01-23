import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
constructor() { }
http=inject(HttpClient)
  registerUser(name:string,email:string,password:string){
    return this.http.post<any>(environment.apiUrl+'/auth/register',{
      name,
      email,
      password
    })
  }
  loginUser(email:string,password:string){
    return this.http.post<any>(environment.apiUrl+'/auth/login',{
      email,
      password
    })

  }
  get isAdminLoggedIn(){
    const userData=localStorage.getItem("user");
    if(userData){
      return JSON.parse(userData).isAdmin;
    }
    return false;

  }
  get isLoggedin(){
    const token=localStorage.getItem("token");
    if(token){
      return true;
    }
    return false;
  }
  get username(){
    const userData=localStorage.getItem("user");
    if(userData){
      return JSON.parse(userData).name
    }
    return null;
  }
  get email(){
    const userData=localStorage.getItem("user");
    if(userData){
      return JSON.parse(userData).email
    }
    else{
      return null;
    }
  }
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  editProfile(userData:any){
    return this.http.put(environment.apiUrl+'/auth/edit-profile',userData)
  }
}
