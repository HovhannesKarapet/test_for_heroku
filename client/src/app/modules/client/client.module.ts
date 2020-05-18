import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {ClientLayoutComponent} from './client-layout/client-layout.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {SharedModule} from "../../shared.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CategoryItemsComponent} from './components/category-items/category-items.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {ControlPanelComponent} from './components/control-panel/control-panel.component';
import {CartComponent} from './components/modals/cart/cart.component';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import { WaiterComponent } from './components/modals/waiter/waiter.component';
import { BillComponent } from './components/modals/bill/bill.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RatingModalComponent } from './components/modals/rating-modal/rating-modal.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../../app.module";
import { OrderComponent } from './components/modals/order/order.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { BestSellersComponent } from './components/best-sellers/best-sellers.component';
import { SearchComponent } from './components/modals/search/search.component';

@NgModule({
  declarations: [
    ClientLayoutComponent,
    NavbarComponent,
    CategoriesComponent,
    CategoryItemsComponent,
    ControlPanelComponent,
    CartComponent,
    WaiterComponent,
    BillComponent,
    RatingModalComponent,
    SignOutComponent,
    OrderComponent,
    AdvertisementComponent,
    BestSellersComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    AngularFontAwesomeModule,
    SharedModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    CartComponent,
    WaiterComponent,
    BillComponent,
    RatingModalComponent,
    SearchComponent
  ]
})
export class ClientModule {
}
