import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SocketService} from "../../../../../services/socket.service";
import {Store} from "@ngxs/store";
import {AuthState} from "../../../../../ngxs/states/auth.state";

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.scss']
})
export class WaiterComponent implements OnInit {

  constructor(
    public activeModal  : NgbActiveModal,
    private socketService: SocketService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.autoClose();
  }

  callWaiter(): void {
    this.socketService.call_waiter(this.store.selectSnapshot(AuthState.login));
    this.activeModal.close();
  }

  autoClose(): void {
    setTimeout(() => {
      this.activeModal.close('timeout');
    }, 10000)
  }
}
