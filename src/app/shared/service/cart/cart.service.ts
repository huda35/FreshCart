import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroments';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartCount:BehaviorSubject<number> = new BehaviorSubject(0)
env=enviroment.baseURL
_httpClient=inject(HttpClient)
token:string = JSON.stringify(localStorage.getItem("userToken"))
  constructor() {
   }

  addProductToCart(productId:string):Observable<any>{
   return this._httpClient.post(`${this.env}/cart`,{productId},
    {
      headers :{
        token:JSON.parse(this.token)
      }
    }
   )
  }

  updateProductQuanitity(productId:string,newCount:number):Observable<any>{
   return this._httpClient.put(`${this.env}/cart/${productId}`,
    {
      "count":newCount
    },
    {
      headers :{
        token:JSON.parse(this.token)
      }
    }
  )
  }

  getCart():Observable<any>{
    return this._httpClient.get(`${this.env}/cart`, {
      headers :{
        token:JSON.parse(this.token)
      }
    })
  }

removeSpacificItem(productId:string):Observable<any>{
   return this._httpClient.delete(`${this.env}/cart/${productId}`, {
    headers :{
      token:JSON.parse(this.token)
    }
  })
  }

clearCart():Observable<any>{
   return this._httpClient.delete(`${this.env}/cart`, {
    headers :{
      token:JSON.parse(this.token)
    }
  })
  }

}
