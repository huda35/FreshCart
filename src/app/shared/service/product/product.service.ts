import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  env=enviroment.baseURL
  private readonly _httpClient = inject (HttpClient)
  constructor() { }
  getProducts () : Observable <any> {
   return this._httpClient.get(`${this.env}/products`)
  }
  getProductById (id:string) : Observable <any> {
   return this._httpClient.get(`${this.env}/products/${id}`)
  }
}
