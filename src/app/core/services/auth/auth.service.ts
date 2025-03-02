import { HttpClient } from '@angular/common/http';
import { afterNextRender, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser, LoginUser } from '../../interfaces/auth-user';
import {jwtDecode} from 'jwt-decode';
import { log } from 'node:console';
import { Router } from '@angular/router';
import { enviroment } from '../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:BehaviorSubject<any> = new BehaviorSubject(null)
  _httpClient=inject(HttpClient)
  _router = inject (Router)
  env=enviroment.baseURL
  constructor() {   
    afterNextRender(()=>{
      this.isLoggedInUser()
    })
   }
  registerUser(userInfo:AuthUser):Observable<any>{
    return this._httpClient.post(`${this.env}/auth/signup`,userInfo)
  }
  loginUser(userInfo:LoginUser):Observable<any>{
    return this._httpClient.post(`${this.env}/auth/signin`,userInfo)
  }

  saveUser(){
    if(localStorage.getItem("userToken")){
       this.userData.next(jwtDecode(localStorage.getItem("userToken")!))
       console.log(this.userData);
       
    }
  }
  logOut(){
    localStorage.removeItem("userToken")
    this.userData.next(null)
    this._router.navigate(['/auth/login'])
  }
  isLoggedInUser():boolean{
    if(localStorage.getItem("userToken")){
      this.userData.next(jwtDecode(localStorage.getItem("userToken")!))
      return true    
   }
   else{
    return false
   }
  }

  
}
