import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  env=enviroment.baseURL
  private readonly _httpClient=inject(HttpClient)
  token:string = JSON.stringify(localStorage.getItem("userToken"))
  constructor() { }

  cashOrder(id:string,shippingAddress:{details:string,phone:string,city:string}):Observable<any>{
     return this._httpClient.post(`${this.env}/orders/${id}`,{shippingAddress},{
      headers:{
        token:JSON.parse(this.token)
      }
     })
    }

  returnAllOrders():Observable<any>{
     return this._httpClient.get(`${this.env}/orders`)
    }

  returnUserOrders(id:string):Observable<any>{
     return this._httpClient.get(`${this.env}/orders/user/${id}`)
    }

  onlinePayment(id:string,shippingAddress:{details:string,phone:string,city:string}):Observable<any>{
    return this._httpClient.post(`${this.env}/orders/checkout-session/${id}?url=http://localhost:4200 `,{shippingAddress},{
      headers:{
        token:JSON.parse(this.token)
      }
    })
  }
}
