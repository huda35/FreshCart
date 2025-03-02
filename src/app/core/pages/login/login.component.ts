import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  apiError!:string
    isCallingApi: boolean=false
    subscription : Subscription = new Subscription()
    loginForm!: FormGroup 
    toggleInput:boolean=false
    _authService = inject(AuthService);
    _router=inject(Router)

    ngOnInit(): void {
      this.initForm()
    }
    initForm(){
     this.loginForm= new FormGroup(
        {
          email: new FormControl(null, [Validators.required, Validators.email]),
          password: new FormControl(null, [Validators.required,Validators.pattern(/^[A-Z]\w{5,}$/),
          ]),
        },
      );
    }
  
    login() {
      console.log(this.loginForm);
      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        
      } else {
        this.apiError=''
        this.isCallingApi=true
        if(this.subscription) this.subscription.unsubscribe()
          this.subscription=this._authService.loginUser(this.loginForm.value).subscribe({
            next:(res)=> {
              console.log(res);
              this.isCallingApi=false
              localStorage.setItem("userToken",res.token)
              this._authService.saveUser()
              timer(2000).subscribe(()=>{
                this._router.navigate(['/home'])
              })
            },
            error:(err)=> {
              console.log(err);
              this.apiError=err.error.message  
              this.isCallingApi=false
            },
            complete:()=> {},
          });
        
        this.isCallingApi=true
      }
    }

    togglePassword(){
      this.toggleInput=!this.toggleInput
    }
    forgetPass():void{
       this._router.navigate(['/auth/forget-password']);
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe()
    }
}
