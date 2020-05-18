import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CartComponent} from "../modals/cart/cart.component";
import {WaiterComponent} from "../modals/waiter/waiter.component";
import {BillComponent} from "../modals/bill/bill.component";
import {Select, Store} from "@ngxs/store";
import {CartState} from "../../../../ngxs/states/cart.state";
import {Observable} from "rxjs";
import {OrdersState} from "../../../../ngxs/states/orders.state";
import {RatingModalComponent} from "../modals/rating-modal/rating-modal.component";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {

  @Select(CartState.count) count$           : Observable<number>;
  @Select(OrdersState.total_sum) total_sum$ : Observable<number>;

  constructor(
    private modalService: NgbModal,
    private store       : Store
  ) {
  }

  openCart() {
    if(!this.store.selectSnapshot(CartState.count)) return;
    this.modalService.open(CartComponent, {windowClass: 'modal-holder', centered: true, scrollable: true});
  }

  callWaiter() {
    this.modalService.open(WaiterComponent, {windowClass: 'modal-holder', centered: true})
  }

  wantBill() {
    const modalRef = this.modalService.open(BillComponent, {
      windowClass: 'modal-holder',
      centered: true,
      scrollable: true
    });
    modalRef.result.then(res => {
      if (res === 'rate') {
        this.modalService.open(RatingModalComponent, { windowClass: 'modal-holder modal_lg ', centered: true})
      }
    }).catch(() => {})
  }
}
