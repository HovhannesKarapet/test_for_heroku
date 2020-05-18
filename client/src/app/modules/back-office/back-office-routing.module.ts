import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BackOfficeLayoutComponent} from "./back-office-layout/back-office-layout.component";
import {TablesComponent} from "./components/tables/tables.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {NewComponent} from "./components/orders/new/new.component";
import {AcceptedComponent} from "./components/orders/accepted/accepted.component";
import {BillComponent} from "./components/bill/bill.component";


const routes: Routes = [
  {path: "", component: BackOfficeLayoutComponent, children: [
      {path: 'tables', component: TablesComponent},
      {path: 'orders', component: OrdersComponent, children: [
          {path: 'new', component: NewComponent},
          {path: 'accepted', component: AcceptedComponent},
          {path: '**', redirectTo: 'new'}
        ]},
      {path: 'bill', component: BillComponent},
      {path: '**', redirectTo: 'tables'}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
