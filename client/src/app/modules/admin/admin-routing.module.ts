import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {UsersComponent} from "./components/users/users.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {CategoryItemsComponent} from "./components/category-items/category-items.component";
import {AdvertisementComponent} from "./components/advertisement/advertisement.component";


const routes: Routes = [
  {path: "", component: AdminLayoutComponent, children: [
      {path: "users", component: UsersComponent},
      {path: "categories", component: CategoriesComponent},
      {path: "category_items", component: CategoryItemsComponent},
      {path: "advertisement", component: AdvertisementComponent},
      {path: "**", redirectTo: "users"}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
