import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CartModel} from "../../../../../models/cart.model";
import {Select, Store} from "@ngxs/store";
import {OrdersState} from "../../../../../ngxs/states/orders.state";
import {LanguageService} from "../../../../../services/language.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  @Select(OrdersState.service_fee) service_fee$: Observable<number>;
  @Select(OrdersState.total_sum) total_sum$: Observable<number>;
  flag    : boolean = false;
  orders  : CartModel[];

  constructor(
    public activeModal  : NgbActiveModal,
    private store       : Store,
    public language    : LanguageService
  ) {
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.orders = this.store.selectSnapshot(OrdersState.orders);
  }

  cash(): void {
    this.activeModal.close('rate');
  }

  with_card(): void {
    this.activeModal.close('rate');
  }
}
