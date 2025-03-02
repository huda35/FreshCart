import { CategoriesService } from './../../../shared/service/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Category } from '../../../shared/interfaces/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  private readonly _categoriesService = inject(CategoriesService)
  constructor() {}
  categoriesData!: Category[];

  ngOnInit(): void {
    this.getCategories()
  }
  getCategories(){
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesData = res.data;
      },
    });
  }
}