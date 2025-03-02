import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../shared/service/categories/categories.service';
import { Category } from '../../../../../shared/interfaces/category';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})
export class PopularCategoriesComponent implements OnInit{
_categoriesService = inject(CategoriesService)
categories! : Category[]
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
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 7
    }
  },
  nav: true
}  
ngOnInit(): void {
  this.getCategories()
}
getCategories(){
  this._categoriesService.getAllCategories().subscribe({
    next : (res) => {
      console.log(res.data);
      this.categories=res.data
    },
    error : (err) => {
      console.log(err);
      
    },
    complete : () => {
      console.log("complete");
      
    },
  })
}
}
