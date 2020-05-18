import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./guards/auth.guard";
import {ClientGuard} from "./guards/client.guard";
import {EmployeeGuard} from "./guards/employee.guard";
import {AdminGuard} from "./guards/admin.guard";


const routes: Routes = [
  {path: "", canActivate:[AuthGuard], component: AuthComponent},
  {path: "home", canActivate: [ClientGuard], loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule)},
  {path: "back_office", canActivate: [EmployeeGuard], loadChildren: () => import('./modules/back-office/back-office.module').then(m => m.BackOfficeModule)},
  {path: "admin", canActivate: [AdminGuard], loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
