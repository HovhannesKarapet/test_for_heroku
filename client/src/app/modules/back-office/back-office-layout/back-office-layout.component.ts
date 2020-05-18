import {Component, OnDestroy, OnInit} from '@angular/core';
import {LanguageService} from "../../../services/language.service";
import {SocketService} from "../../../services/socket.service";
import {Bill, ConfirmWaiterCall, Connect, NewOrder, Waiter} from "../../../ngxs/actions/tables.action";
import {Store} from "@ngxs/store";
import {TablesState} from "../../../ngxs/states/tables.state";
import {log} from "util";

@Component({
  selector: 'app-back-office-layout',
  templateUrl: './back-office-layout.component.html',
  styleUrls: ['./back-office-layout.component.scss']
})
export class BackOfficeLayoutComponent implements OnInit, OnDestroy {

  new_orders = this.store.selectSnapshot(TablesState.new_orders);
  waiter_calls: any = this.store.selectSnapshot(TablesState.waiter);
  logInSub$ = null;
  logOutSub$ = null;
  orderSub$ = null;
  billSub$ = null;
  waiterSub$ = null;



  constructor(
    public languageService: LanguageService,
    private socketService: SocketService,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.loggedIn();
    this.loggedOut();
    this.newOrder();
    this.bill();
    this.waiter();
  }

  ngOnDestroy(): void {
    this.logInSub$.unsubscribe();
    this.logOutSub$.unsubscribe();
    this.orderSub$.unsubscribe();
    this.billSub$.unsubscribe();
    this.waiterSub$.unsubscribe();
  }

  loggedIn(): void {
     this.logInSub$ = this.socketService.loggedIn().subscribe(res => {
      this.store.dispatch(new Connect({loggedIn: true, login: res.user.login}))
    })
  }

  loggedOut(): void {
    this.logOutSub$ = this.socketService.loggedOut().subscribe(res => {
      this.store.dispatch(new Connect({loggedIn: false, login: res.user.login}))
    })
  }

  newOrder(): void {
    this.orderSub$ = this.socketService.getNewOrder().subscribe(res => {
      this.new_orders[res.login] ? this.new_orders[res.login] = [...this.new_orders[res.login], ...res.order] : this.new_orders[res.login] = res.order;
      this.store.dispatch(new NewOrder({login: res.login, order: this.new_orders[res.login]}))
    })
  }

  bill(): void {
    this.billSub$ =  this.socketService.bill().subscribe(res => {
      this.store.dispatch(new Bill(res))
    })
  }

  waiter(): void {
    this.waiterSub$ = this.socketService.waiter().subscribe(res => {
      this.store.dispatch(new Waiter(res))
    })
  }

  confirmWaiterCall(login) {
    this.store.dispatch(new ConfirmWaiterCall(login))
  }
}
