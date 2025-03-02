import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../../../shared/service/brand/brand.service';
import { Brands } from '../../../shared/interfaces/brand';



@Component({
  selector: 'app-brandsdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brandsdetails.component.html',
  styleUrls: ['./brandsdetails.component.scss']
})
export class BrandsdetailsComponent  {
  APIError!:string
  brandDetails! : Brands
  private readonly _brandService = inject(BrandService)
  private readonly _activatedRoute=inject (ActivatedRoute)

  constructor(){}

  
  ngOnInit(): void {
    this.getBrandID()
  }
  getBrandID(){
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
    this._brandService.getBrandsDetails(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.brandDetails= res.data
      },
      error:(err) =>{
        console.log(err);
        this.APIError=err.error.message
      },
    })
  }
}
