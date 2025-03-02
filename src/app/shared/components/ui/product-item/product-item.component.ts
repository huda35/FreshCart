import { RouterLink } from '@angular/router';
import { Product } from './../../../interfaces/product';
import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core'
import { CartService } from '../../../service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../service/product/product.service';
import { Subscription } from 'rxjs';
import { WishListService } from '../../../service/wishlist/wishlist.service';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  private readonly _wishListService=inject(WishListService)
  private readonly _cartService = inject (CartService)
  private readonly _toastr = inject (ToastrService)
  
  subscriptions: Subscription[] = [];
  changeColor:boolean=false
  productIds: string[] = [];
  @Input() product!:Product
  @Output()fireAddToCart :EventEmitter<string> =new EventEmitter()
  private _ToastrService: any;
  // product=input.required<Product>()
  handleAddToCart(id:string){
    this.fireAddToCart.emit(id)
  }
  addItemToWishlist(p_id:string){
    this._wishListService.addToUserWishList(p_id).subscribe({
      next:(res)=>{console.log(res)
        this.changeColor=true
        console.log(this._cartService.cartCount)
        this._ToastrService.success(res.message , 'Done')
      },
      error:(err)=>{console.log(err)}
    })
  }
}
