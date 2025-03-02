import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroments';


@Injectable({
  providedIn: 'root'
})
export class WishListService {
  
   env=enviroment.baseURL
  // user token
  private userToken:string=localStorage.getItem('userToken')!;
  // Inject HttpClient service.
  httpClient:HttpClient = inject(HttpClient);

  // Add to user wishList.
  addToUserWishList(pId:string):Observable<any>{
    return this.httpClient.post(`${this.env}/wishlist`,{productId:pId},{headers:{token:this.userToken}});
  }
  // Get user wishList.
  getUserWishList():Observable<any>{
    return this.httpClient.get(`${this.env}/wishlist`,{headers:{token:this.userToken}});
  }
  // Remove from user wishList
  removeFromUserWishList(pId:string):Observable<any>{
    return this.httpClient.delete(`$${this.env}/wishlist/${pId}`,{headers:{token:this.userToken}});
  }
}