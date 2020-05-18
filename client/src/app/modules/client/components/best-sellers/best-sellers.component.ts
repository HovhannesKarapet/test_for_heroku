import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoriesService} from "../../../../services/categories.service";
import {CategoryItemsService} from "../../../../services/category-items.service";
import {CategoryItemModel} from "../../../../models/category-item.model";
import {LanguageService} from "../../../../services/language.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Add} from "../../../../ngxs/actions/cart.actions";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.scss']
})
export class BestSellersComponent implements OnInit {

  @ViewChild('p', {static: false})
  popContent;
  best_sellers: CategoryItemModel[];
  form            : FormGroup = new FormGroup({
    instruction : new FormControl(null),
    count       : new FormControl(1, [Validators.required, Validators.min(1)])
  });

  constructor(
    private categoryItemsService: CategoryItemsService,
    public language            : LanguageService,
    private store               : Store
  ) { }

  ngOnInit() {
    this.getBestSellers();
  }

  getBestSellers(): void {
    this.categoryItemsService.getBestSellers().subscribe(res => {
      this.best_sellers = res;
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

export function makeOrder(form, store, name, price): void {
  if (form.invalid) return form.get('count').setValue(1);

  let order = {
    name        : name,
    price       : price,
    count       : form.value.count,
    instruction : form.value.instruction
  };

  store.dispatch(new Add(order));
  form.get('count').setValue(1);
}
