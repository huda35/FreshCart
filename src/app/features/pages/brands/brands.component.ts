import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BrandService } from '../../../shared/service/brand/brand.service';
import { Brands } from '../../../shared/interfaces/brand';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly _brandService=inject(BrandService)
  constructor() {}
  brandsData!: Brands[];
  ngOnInit(): void {
    this.getBrands()
  }

  getBrands(){
    this._brandService.getAllBrands().subscribe({
      next:(res) =>{
        console.log(res)
        this.brandsData = res.data;
      }
    })
  }

  

}

