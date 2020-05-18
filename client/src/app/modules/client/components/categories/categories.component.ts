import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../../../services/categories.service";
import {CategoryModel} from "../../../../models/category.model";
import {LanguageService} from "../../../../services/language.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: CategoryModel[];

  constructor(
    private categoriesService : CategoriesService,
    public language          : LanguageService
  ) {
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = res;
    })
  }

}
