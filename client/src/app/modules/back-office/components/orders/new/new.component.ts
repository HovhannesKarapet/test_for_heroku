import { Component, OnInit } from '@angular/core';
import {Store} from "@ngxs/store";
import {TablesState} from "../../../../../ngxs/states/tables.state";
import {LanguageService} from "../../../../../services/language.service";
import {ConfirmOrder} from "../../../../../ngxs/actions/tables.action";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  new_orders: any = this.store.selectSnapshot(TablesState.new_orders);

  constructor(
    private store: Store,
    public language: LanguageService
  ) { }

  ngOnInit(): void {}

  confirm(index: string): void {
    // this.tables[index].blink = false;
    this.store.dispatch(new ConfirmOrder(index))
  }

}
