import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderComponent} from "../modals/order/order.component";
import {UsersService} from "../../../../services/users.service";
import {SocketService} from "../../../../services/socket.service";
import {Select, Store} from "@ngxs/store";
import {ConfirmOrder, Connect, NewOrder, Reserve, SetTables} from "../../../../ngxs/actions/tables.action";
import {TablesState} from "../../../../ngxs/states/tables.state";
import {ReserveComponent} from "../modals/reserve/reserve.component";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  tables: any = this.store.selectSnapshot(TablesState.tables);
  new_orders: any = this.store.selectSnapshot(TablesState.new_orders);
  constructor(
    private modalService  : NgbModal,
    private usersService  : UsersService,
    private socketService : SocketService,
    private store         : Store
  ) { }

  ngOnInit(): void {
    this.getTables();
  }

  getTables(): void {
    if(!this.tables) this.usersService.getGuests().subscribe(res => {
      this.tables = res;
      console.log(res);
      this.store.dispatch(new SetTables(res));
    })
  }

  openOrder(index: string): void {
    if(!this.tables[index].loggedIn) return this.reserve(index);
    else if(!this.new_orders[index]) return;
    const modalRef = this.modalService.open(OrderComponent, {windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance._data = {
      index: index
    };
    modalRef.result.then(() => {
      this.tables[index].blink = false;
      this.store.dispatch(new ConfirmOrder(index))
    }).catch(() => {})
  }

  reserve(index: string): void {
    const modalRef = this.modalService.open(ReserveComponent, {windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance._data = {
      index: index,
      reserved: this.tables[index].reserved
    };
    modalRef.result.then((result) => {
      this.tables[index].reserved = result;
      this.usersService.reserve(this.tables[index]._id, {reserved: result}).subscribe(() => {
        this.store.dispatch(new Reserve({reserved: result, login: index}))
      });
    }).catch(() => {})
  }
}
