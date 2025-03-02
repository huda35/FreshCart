import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/service/cart/cart.service';
import { Wishlist } from '../../../shared/interfaces/wishlist';
import { WishListService } from '../../../shared/service/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService = inject(WishListService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  wishlistItems!:Wishlist[]
  getwishSub!:Subscription
  changeColor:boolean=false
  ngOnInit(): void {
    this._WishlistService.getUserWishList().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.wishlistItems = res.data
      },
      error:(err)=>{
        console.log(err)
      }


    })
  }

  addItem(p_id:string){
    this._CartService.addProductToCart(p_id).subscribe({
      next:(res)=>{console.log(res)
        this.changeColor=true
        this._CartService.cartCount.next(res.numOfCartItems)
        this._ToastrService.success(res.message , 'Done')
      },
      error:(err)=>{console.log(err)}
    })
  }

  deleteItem(p_id:string):void{
   this.getwishSub = this._WishlistService.removeFromUserWishList(p_id).subscribe({
      next:(res)=>{console.log(res.data)
        this.wishlistItems = res.data
        this.changeColor=true
        
      },
      error:(err)=>{console.log(err)}
    })

  }
}
