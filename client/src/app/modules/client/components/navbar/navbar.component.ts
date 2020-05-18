import {Component, OnInit, ViewChild} from '@angular/core';
import {LanguageService} from "../../../../services/language.service";
import {SearchService} from "../../../../services/search.service";
import {CategoryItemModel} from "../../../../models/category-item.model";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SearchComponent} from "../modals/search/search.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @ViewChild('p', {static: false})
  popContent;
  search_value  : string;
  search_result :CategoryItemModel[];

  constructor(
    public language      : LanguageService,
    private searchService : SearchService,
    private router        : Router,
    private modalService  : NgbModal
  ) { }

  search(): void {
    if(this.search_value.length < 2) {
      this.search_result = [];
      this.popContent.close();
      return;
    }

    this.popContent.open();

    this.searchService.search(this.search_value).subscribe((res) => {
      console.log(res);
      this.search_result = res;
    })
  }

  watch(item): void {
    let modalRef = this.modalService.open(SearchComponent, {windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance._data = item;
    this.popContent.close();
  }

  navigate(item): void {
    item.name = JSON.stringify(item.name);
    item.description = JSON.stringify(item.description);
    this.router.navigate(['/home/category', item.category_id], {queryParams: item})
  }
}
