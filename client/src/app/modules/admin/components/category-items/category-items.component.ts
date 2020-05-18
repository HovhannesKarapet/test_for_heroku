import { Component, OnInit } from '@angular/core';
import {CategoryModel} from "../../../../models/category.model";
import {CategoryItemModel} from "../../../../models/category-item.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoriesService} from "../../../../services/categories.service";
import {ConfirmModalComponent} from "../../modals/confirm-modal/confirm-modal.component";
import {CategoryItemsService} from "../../../../services/category-items.service";
import {CategoryItemModalComponent} from "../../modals/category-item-modal/category-item-modal.component";

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss']
})
export class CategoryItemsComponent implements OnInit {

  category_id   : string;
  categories    : CategoryModel[];
  category_items: CategoryItemModel[];

  constructor(
    private modalService        : NgbModal,
    private categoriesService   : CategoriesService,
    private categoryItemsService: CategoryItemsService,

  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getCategoryNames().subscribe(data => {
      this.categories = data
    })
  }

  getCategoryItems(category_id): void {
    this.categoryItemsService.getCategoryItems(category_id).subscribe(data => {
      console.log(data);
      this.category_items = data
    })
  }

  addCategoryItem(): void {
    const modalRef = this.modalService.open(CategoryItemModalComponent, {windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance._data = {
      flag      : false,
      name      : 'Add Category Item',
      categories: this.categories
    };
    modalRef.result.then((res) => {
      if (res.category_id === this.category_id) {
        this.category_items.push(res);
      }
    }, () => {})
  }

  updateCategoryItem(index: number): void {
    const modalRef = this.modalService.open(CategoryItemModalComponent, {windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance._data = {
      flag          : true,
      name          : 'Update Category Item',
      categories    : this.categories,
      category_item : this.category_items[index]
    };
    modalRef.result.then((res) => {
      this.category_items[index] = res;
    }, () => {})
  }

  removeCategoryItem(index: number): void {
    this.modalService.open(ConfirmModalComponent, {windowClass: 'modal-holder', centered: true})
      .result.then(() => {
      this.categoryItemsService.removeCategoryItem(this.category_items[index]._id).subscribe(() => {
        this.category_items.splice(index, 1);
      })
    }, () => {})
  }
}
