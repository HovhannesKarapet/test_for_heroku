import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngxs/store";
import {CartState} from "../../../../../ngxs/states/cart.state";
import {CartModel} from "../../../../../models/cart.model";
import {LanguageService} from "../../../../../services/language.service";
import {Remove, RemoveAll} from "../../../../../ngxs/actions/cart.actions";
import {Add} from "../../../../../ngxs/actions/orders.action";
import {SocketService} from "../../../../../services/socket.service";
import {AuthState} from "../../../../../ngxs/states/auth.state";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  orders      : CartModel[];
  service_fee : number;
  total       : number;

  constructor(
    public activeModal    : NgbActiveModal,
    private store         : Store,
    public language      : LanguageService,
    private socketService : SocketService
  ) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(): void {
    this.orders = this.store.selectSnapshot(CartState.cart);
    this.sumTotal()
  }

  remove(index: number): void {
    this.orders.splice(index, 1);
    this.store.dispatch(new Remove(index));
    this.sumTotal()
  }

  serviceFee(): void {
    this.service_fee = 0;
    this.orders.forEach(item => {
      this.service_fee += (item.price*item.count);
    });
    this.service_fee /= 10;
  }
  sumTotal(): void {
    this.serviceFee();
    this.total = 0;
    this.orders.forEach(item => {
      this.total += (item.price*item.count);
    });
    this.total += this.service_fee;
  }

  confirmOrder(): void {
    if(!this.orders.length) return;

    const payload = {orders: this.orders, service_fee: this.service_fee, total_sum: this.total};
    this.store.dispatch(new Add(payload));
    this.socketService.makeOrder({login: this.store.selectSnapshot(AuthState.login), order: this.orders});
    this.store.dispatch(new RemoveAll());
    this.activeModal.close();
  }

}
