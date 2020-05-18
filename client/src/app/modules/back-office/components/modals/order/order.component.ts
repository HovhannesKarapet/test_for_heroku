import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {LanguageService} from "../../../../../services/language.service";
import {Store} from "@ngxs/store";
import {TablesState} from "../../../../../ngxs/states/tables.state";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() _data;
  order$ = this.store.selectSnapshot(TablesState.new_orders);

  constructor(
    public activeModal: NgbActiveModal,
    public language   : LanguageService,
    private store     : Store
  ) { }

  ngOnInit() {
    console.log(this._data.index);
    console.log(this.order$[this._data.index]);
  }

}
