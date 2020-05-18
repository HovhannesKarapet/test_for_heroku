import { Component, OnInit } from '@angular/core';
import {TablesState} from "../../../../ngxs/states/tables.state";
import {Store} from "@ngxs/store";
import {LanguageService} from "../../../../services/language.service";
import {ConfirmBill} from "../../../../ngxs/actions/tables.action";
import {log} from "util";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  orders: any = this.store.selectSnapshot(TablesState.bill);

  constructor(
    private store: Store,
    public language: LanguageService
  ) { }

  ngOnInit() {
    totalPrice(this.orders);
  }

  confirmBill(login): void {
    this.store.dispatch(new ConfirmBill(login));
  }

}

export function totalPrice(orders): void {
  for(let key in orders) {
    orders[key].total_price = 0;
    orders[key].service_fee = 0;
    orders[key].forEach(item => {
      orders[key].total_price += item.count*item.price;
    });
    orders[key].service_fee = orders[key].total_price/10;
    orders[key].total_price += orders[key].service_fee;
  }
}
