import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  env=enviroment.baseURL
  private readonly _httpClient = inject (HttpClient)
  constructor() { }
  getAllCategories () : Observable <any> {
     return this._httpClient.get(`${this.env}/categories`)
    }
  getCategoryDetails(id: string): Observable<any> {
    return this._httpClient.get(`${this.env}/categories/${id}`)
    }
}
