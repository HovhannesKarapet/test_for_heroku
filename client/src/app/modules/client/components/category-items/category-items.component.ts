import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryItemsService} from "../../../../services/category-items.service";
import {ActivatedRoute} from "@angular/router";
import {CategoryModel} from "../../../../models/category.model";
import {CategoriesService} from "../../../../services/categories.service";
import {LanguageService} from "../../../../services/language.service";
import {CategoryItemModel} from "../../../../models/category-item.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngxs/store";
import {makeOrder} from "../best-sellers/best-sellers.component";

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss']
})
export class CategoryItemsComponent implements OnInit{

  @ViewChild('p', {static: false})
  popContent;
  categories      : CategoryModel[];
  category_items  : CategoryItemModel[];
  form            : FormGroup = new FormGroup({
    instruction : new FormControl(null),
    count       : new FormControl(1, [Validators.required, Validators.min(1)])
  });

  constructor(
    private categoriesService   : CategoriesService,
    private CategoryItemsService: CategoryItemsService,
    public language            : LanguageService,
    private activatedRoute      : ActivatedRoute,
    private store               : Store,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCategoryItems(params['id']);
    });
    this.activatedRoute.queryParams.subscribe(params => {
      // params.name = JSON.parse(params.name);
      // params.description = JSON.parse(params.description);
      console.log(params);
      // this.popContent.open()
    });
    this.getCategories();

  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = res;
    })
  }

  getCategoryItems(id): void {
    this.CategoryItemsService.getCategoryItems(id).subscribe(res => {
      this.category_items = res;
      console.log(res);
    })
  }

  dec(): void {
    if (this.form.get('count').value > 1) {
      this.form.get('count').setValue(this.form.get('count').value - 1);
    }
  }

  inc(): void {
    this.form.get('count').setValue(this.form.get('count').value + 1);
  }

  makeOrder(name, price): void {
    makeOrder(this.form, this.store, name, price);
    this.popContent.close();
  }
}
