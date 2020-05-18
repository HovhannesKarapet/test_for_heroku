import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BackOfficeRoutingModule} from './back-office-routing.module';
import {BackOfficeLayoutComponent} from './back-office-layout/back-office-layout.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {TranslateModule} from "@ngx-translate/core";
import {TablesComponent} from './components/tables/tables.component';
import {OrderComponent} from './components/modals/order/order.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {OrdersComponent} from './components/orders/orders.component';
import {ReserveComponent} from './components/modals/reserve/reserve.component';
import {SharedModule} from "../../shared.module";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import { NewComponent } from './components/orders/new/new.component';
import { AcceptedComponent } from './components/orders/accepted/accepted.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import { BillComponent } from './components/bill/bill.component';


@NgModule({
  declarations: [
    BackOfficeLayoutComponent,
    NavbarComponent,
    TablesComponent,
    OrderComponent,
    OrdersComponent,
    ReserveComponent,
    NewComponent,
    AcceptedComponent,
    BillComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    TranslateModule,
    AngularFontAwesomeModule,
    NgbModule,
    SharedModule
  ],
  entryComponents: [
    OrderComponent,
    ReserveComponent
  ]
})
export class BackOfficeModule {
}
