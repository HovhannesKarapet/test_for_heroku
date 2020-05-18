import {Component, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {TablesState} from "../../../../ngxs/states/tables.state";
import {Observable} from "rxjs";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Select(TablesState.busy_tables) busy_tables$: Observable<number>;
  @Select(TablesState.free_tables) free_tables$: Observable<number>;
  @Select(TablesState.reserved_tables) reserved_tables$: Observable<number>;
  @Select(TablesState.bill_count) bill_count$: Observable<number>;

  navbar_items: any[] = [
    {
      name: 'BAR.TABLES',
      path: 'tables'
    },
    {
      name: 'BAR.ORDERS',
      path: 'orders'
    },
    {
      name: 'BAR.TAKE_THE_BILL',
      path: 'bill'
    }
  ];

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  logout(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.authService.logout(user.login).subscribe()
  }

}
