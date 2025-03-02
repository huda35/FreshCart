import { Spinner } from './../../node_modules/ngx-spinner/lib/ngx-spinner.enum.d';
import { AuthService } from './core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './shared/service/flowbite.service';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,FooterComponent,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'FreshCart';
  _flowbiteService = inject (FlowbiteService)
  // _authService = inject (AuthService)
  ngOnInit(): void {
    
    this._flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
    // this._authService.isLoggedInUser()
    
  }
}
