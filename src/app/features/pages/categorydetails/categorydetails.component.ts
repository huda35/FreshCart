import { CategoriesService } from './../../../shared/service/categories/categories.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../shared/interfaces/category';

@Component({
  selector: 'app-categorydetails',
  imports: [CommonModule],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.scss'
})

export class CategorydetailsComponent  {
  APIError!:string
  categoryDetails! : Category
  private readonly _categoriesService = inject(CategoriesService)
  private readonly _activatedRoute=inject (ActivatedRoute)

  constructor(){}

  categoryId:string|null = '';

  ngOnInit(): void {
    this.getCategoryID()
  }
  getCategoryID(){
  let {id}:any =  this._activatedRoute.snapshot.params
  console.log(id);
  this.getDetails(id)
  }
  getDetails(id:string){
    this._categoriesService.getCategoryDetails(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.categoryDetails= res.data
      },
      error:(err) =>{
        console.log(err);
        this.APIError=err.error.message
      },
    })
  }

}