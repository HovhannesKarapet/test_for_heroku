import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientLayoutComponent} from "./client-layout/client-layout.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {CategoryItemsComponent} from "./components/category-items/category-items.component";
import {SignOutComponent} from "./components/sign-out/sign-out.component";
import {SignOutGuard} from "../../guards/sign-out.guard";
import {BestSellersComponent} from "./components/best-sellers/best-sellers.component";


const routes: Routes = [
  {path: "sign_out", component: SignOutComponent},
  {path: "", canActivate:[SignOutGuard], component: ClientLayoutComponent, children: [
      {path: "categories", component: CategoriesComponent },
      {path: "category/:id", component: CategoryItemsComponent},
      {path: "best_sellers", component: BestSellersComponent},
      {path: "**", redirectTo: "categories"}
    ]},
  {path: '**', redirectTo: 'sign_out'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
