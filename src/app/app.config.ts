import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { spinnerInterceptor } from './core/interceptors/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([httpErrorInterceptor,spinnerInterceptor])),
    importProvidersFrom([BrowserAnimationsModule]),
    provideToastr(), 
  ]
};
