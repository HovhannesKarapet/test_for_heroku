import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {Store} from "@ngxs/store";
import {AuthState} from "../../../../ngxs/states/auth.state";
import {LanguageService} from "../../../../services/language.service";

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent {

  login   : string;
  password: string;
  onload  : boolean = false;

  constructor(
    private authService: AuthService,
    private store: Store,
    public language: LanguageService
  ) {
    this.login = this.store.selectSnapshot(AuthState.login);
  }

  logout() {
    if (!this.password) return;

    this.onload = !this.onload;
    this.authService.logoutFromGuest({login: this.login,password: this.password}).subscribe((res) => {
      this.authService.logout(this.login).subscribe();
    }, error => {
      this.onload = !this.onload;
    });
  }
}
