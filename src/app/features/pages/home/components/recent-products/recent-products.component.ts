import { CartService } from './../../../../../shared/service/cart/cart.service';
import { Console } from 'node:console';
import { ProductService } from './../../../../../shared/service/product/product.service';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../../../shared/interfaces/product';
import { ProductItemComponent } from '../../../../../shared/components/ui/product-item/product-item.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-recent-products',
  imports: [ProductItemComponent],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss'
})
export class RecentProductsComponent implements OnInit {
  products!: Product[]
  private readonly _toastr = inject (ToastrService)
  private readonly _productService = inject (ProductService)
  private readonly _cartService = inject (CartService)
  ngOnInit(): void {
    this.getProducts()
  }
  getProducts(){
    this._productService.getProducts().subscribe({
      next : (res) => {
        console.log(res.data);
        this.products = res.data
      },
      error : (err) => {
        console.log(err);
        
      },
      complete : () => {
        console.log("complete");
        
      },
    })
  }
  addToCart(id:string){
    this._cartService.addProductToCart(id).subscribe({
      next:(res)=> {
        console.log(res);
        this._toastr.success(res.message, 'Hi !');
      },
    })
  }
  
}
