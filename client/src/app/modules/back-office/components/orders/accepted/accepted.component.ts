import { Component, OnInit } from '@angular/core';
import {Store} from "@ngxs/store";
import {TablesState} from "../../../../../ngxs/states/tables.state";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {LanguageService} from "../../../../../services/language.service";
import {totalPrice} from "../../bill/bill.component";

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('open', style({
        height:'0',
        overflow:'hidden',
        opacity:'0'
      })),
      state('closed', style({
        overflow:'hidden',
        opacity:'1'
      })),
      transition('* => *', [animate('300ms')])
    ]),
    trigger('arrow', [
      state('up', style({
        transform:'rotate(-135deg)',
      })),
      state('down', style({
        transform:'rotate(45deg)',
      })),
      transition('* => *', [animate('300ms')])
    ]),
  ]
})
export class AcceptedComponent implements OnInit {

  accepted_orders: any = this.store.selectSnapshot(TablesState.accepted_orders);
  collapse_array = [];

  constructor(
    private store: Store,
    public language: LanguageService
  ) { }

  ngOnInit() {
    totalPrice(this.accepted_orders)
  }

  // totalPrice(): void {
  //   for(let key in this.accepted_orders) {
  //     this.accepted_orders[key].total_price = 0;
  //     this.accepted_orders[key].service_fee = 0;
  //     this.accepted_orders[key].forEach(item => {
  //       this.accepted_orders[key].total_price += item.count*item.price;
  //     });
  //     this.accepted_orders[key].service_fee = this.accepted_orders[key].total_price/10;
  //     this.accepted_orders[key].total_price += this.accepted_orders[key].service_fee;
  //   }
  // }
}
