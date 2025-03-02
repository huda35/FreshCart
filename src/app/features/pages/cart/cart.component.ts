import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/service/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartDetails!:Cart
  isLoading:boolean=true
  emptyCart:boolean=false
  private readonly _cartService=inject(CartService)

  ngOnInit(): void {
    this.getCart()
  }
  getCart(){
    this._cartService.getCart().subscribe({
      next:(res)=> {
        console.log(res);
        this.cartDetails=res
        this.isLoading=false
      }
    })
  }
  removeItem(id:string){
    this.isLoading=true
    this._cartService.removeSpacificItem(id).subscribe({
      next:(res)=> {
        console.log(res);
        this.cartDetails =res
        this.isLoading=false
      }
    })
  }

updateCount(id:string,count:number):void{
  this._cartService.updateProductQuanitity(id,count).subscribe({
    next:(res)=> {
      console.log(res);
      this.cartDetails =res
    },
    error:(err)=> {
      console.log(err);
      
    },
  })

}
  // updateCount(id:string,count:number){
  //   this.isLoading=true
  //   this._cartService.updateProductQuanitity(id,`${count}`).subscribe({
  //     next:(res)=> {
  //       console.log(res);
        
  //       this.cartDetails =res
  //       this.isLoading=false
  //     }
  //   })
  // }


  ClearCart(){
    this.isLoading=true
    this._cartService.clearCart().subscribe({
      next:(res)=> {
        console.log(res);
        this.isLoading=false
        if(res.message=="success"){
          this.cartDetails={}as Cart
          this.emptyCart=true
        }
      }
    })
  }
}
