import { AuthService } from './../../services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  _authService = inject (AuthService)
  
  isLoggedIn:any
  constructor(){
  //  console.log(this.isLoggedIn);
    // console.log(this._authService.userData.asObservable());
    // console.log(this._authService.userData,"hello from user data"); 
  }
 
  ngOnInit(): void {
    this.checkLoggedinStatus()
  }
  checkLoggedinStatus(){
    this._authService.userData.subscribe({
      next:(res)=>{
        this.isLoggedIn = res
      }
     })
  }
  signOut(){
    this._authService.logOut()
  }
}
