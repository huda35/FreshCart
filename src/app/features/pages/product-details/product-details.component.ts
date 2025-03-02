import { Subscription } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'node:console';
import { ProductService } from '../../../shared/service/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  isLoading:boolean=false
private readonly _activatedRoute=inject (ActivatedRoute)
private readonly _productService=inject(ProductService)
private readonly _cartService = inject (CartService)
private readonly _toastr = inject (ToastrService)


productDetails! : Product
APIError!:string
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
  },
  nav: true
} 
  ngOnInit(): void {
    this.getID()
  }

    getID(){
      // this._activatedRoute.paramMap.subscribe({
      //   next:(res:any)=>{
      //    console.log(res?.params?.id);
      //   }
      // })
    let {id}:any =  this._activatedRoute.snapshot.params
    console.log(id);
    this.getDetails(id)
    }
    getDetails(id:string){
      this._productService.getProductById(id).subscribe({
        next:(res)=>{
          console.log(res);
          this.productDetails= res.data
        },
        error:(err) =>{
          console.log(err);
          this.APIError=err.error.message
        },
      })
    }
      addToCart(id:string){
        this.isLoading=true
       this._cartService.addProductToCart(id).subscribe({
        next:(res)=> {
          console.log(res);
          this.isLoading=false
          this._toastr.success(res.message, 'Hi !');
        },
       })
      }
     
    
}
