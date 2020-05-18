import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import {HttpClientModule} from "@angular/common/http";
import { UsersComponent } from './components/users/users.component';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserModalComponent } from './modals/user-modal/user-modal.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryModalComponent } from './modals/category-modal/category-modal.component';
import { CategoryItemsComponent } from './components/category-items/category-items.component';
import { CategoryItemModalComponent } from './modals/category-item-modal/category-item-modal.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { AdvertisementModalComponent } from './modals/advertisement-modal/advertisement-modal.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    UsersComponent,
    UserModalComponent,
    ConfirmModalComponent,
    CategoriesComponent,
    CategoryModalComponent,
    CategoryItemsComponent,
    CategoryItemModalComponent,
    AdvertisementComponent,
    AdvertisementModalComponent
  ],
  entryComponents: [
    ConfirmModalComponent,
    UserModalComponent,
    CategoryModalComponent,
    CategoryItemModalComponent,
    AdvertisementModalComponent
  ],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    NgbModule,
    AdminRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
