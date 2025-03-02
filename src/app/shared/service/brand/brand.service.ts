import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  env=enviroment.baseURL
  private readonly _httpClient = inject (HttpClient)
  constructor() { }
  getAllBrands () : Observable <any> {
    return this._httpClient.get(`${this.env}/brands`)
   }
   getBrandsDetails(id: string): Observable<any> {
    return this._httpClient.get(`${this.env}/brands/${id}`)
  }
}

