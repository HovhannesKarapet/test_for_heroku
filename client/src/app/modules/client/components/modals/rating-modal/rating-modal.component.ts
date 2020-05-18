import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SocketService} from "../../../../../services/socket.service";
import {Store} from "@ngxs/store";
import {AuthService} from "../../../../../services/auth.service";
import {AuthState} from "../../../../../ngxs/states/auth.state";
import {RatingService} from "../../../../../services/rating.service";
import {SignOut} from "../../../../../ngxs/actions/auth.actions";

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss']
})
export class RatingModalComponent {

  app_rate          : number = 0;
  cafe_service_rate : number = 0;
  food_rate         : number = 0;

  constructor(
    private activeModal   : NgbActiveModal,
    private router        : Router,
    private socketService : SocketService,
    private store         : Store,
    private ratingService : RatingService
  ) { }

  confirm(): void {
    this.ratingService.rate({app_rate: this.app_rate, cafe_service_rate: this.cafe_service_rate, food_rate: this.food_rate}).subscribe(() => {
      this.close();
    });
  }

  close(): void {
    this.store.dispatch(new SignOut());
    this.router.navigate(['home/sign_out']);
    this.socketService.wantBill(this.store.selectSnapshot(AuthState.login));
    this.activeModal.close();
  }
}
