import {HttpInterceptorFn } from "@angular/common/http";

export const tokenHttpInterceptor:HttpInterceptorFn=(req,next)=>{
  const token=localStorage.getItem("token");
  console.log("Token",token);
  req=req.clone({
    setHeaders:{
      Authorization:`${token}`,
    }
  })
  return next(req);
}