import { Component, OnInit } from '@angular/core';
import {CategoryModel} from "../../../../models/category.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryModalComponent} from "../../modals/category-modal/category-modal.component";
import {CategoriesService} from "../../../../services/categories.service";
import {ConfirmModalComponent} from "../../modals/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: CategoryModel[];

  constructor(
    private modalService      : NgbModal,
    private categoriesService : CategoriesService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getCategoryNames().subscribe(res => {
      this.categories = res
    })
  }

  addCategory(): void {
    const modalRef = this.modalService.open(CategoryModalComponent, {windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance._data = {
      flag  : false,
      name  : 'Add Category'
    };
    modalRef.result.then(res => {
        this.categories.push(res);
    }, () => {})
  }

  updateCategory(index: number): void {
    const modalRef = this.modalService.open(CategoryModalComponent, {windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance._data = {
      flag    : true,
      name    : 'Update Category',
      category: this.categories[index]
    };
    modalRef.result.then(res => {
      this.categories[index] = res;
    }, () => {})
  }

  removeCategory(index: number): void {
    this.modalService.open(ConfirmModalComponent, {windowClass: 'modal-holder', centered: true})
      .result.then(() => {
      this.categoriesService.removeCategories(this.categories[index]._id).subscribe(() => {
        this.categories.splice(index, 1);
      })
    }, () => {})
  }
}
