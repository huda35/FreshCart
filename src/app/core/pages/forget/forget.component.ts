import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget',
  imports: [ReactiveFormsModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {
  forgetPassForm: FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required])

  })
}


