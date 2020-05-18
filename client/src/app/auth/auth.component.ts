import { Component, OnInit } from '@angular/core';
import {LanguageService} from "../services/language.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {RolesService} from "../services/roles.service";
import {RoleModel} from "../models/role.model";
import {Store} from "@ngxs/store";
import {Login} from "../ngxs/actions/auth.actions";
import {SocketService} from "../services/socket.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  roles : RoleModel[];
  onload: boolean = false;
  error: string;

  form: FormGroup = new FormGroup({
    login   : new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(
    public language      : LanguageService,
    private authService   : AuthService,
    private RolesService  : RolesService,
    private router        : Router,
    private store         : Store,
    private socketService : SocketService
  ) {}

  ngOnInit():void {
    this.getRoles();
  }

  getRoles(): void {
    this.RolesService.getRoles().subscribe(res => {
      this.roles = res;
    })
  }

  navigate(role, {user, token}): void {
    let result;
    this.roles.forEach((item) => {
      if (item._id === role) {
        result = item;
        localStorage.setItem('role', JSON.stringify(item));
      }
    });

    this.dispatch(token, user, result);

    if(result.is_admin) this.router.navigate(['/admin']);
    else if(result.is_employee) this.router.navigate(['/back_office']);
    else this.router.navigate(['/home']);
  }


  dispatch(token, user, role): void {
    this.store.dispatch(new Login({token, user, role, logout: false}));
  }

  login(): void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    this.onload = !this.onload;

    this.authService.login(this.form.value).subscribe(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      this.navigate(res.user.role, res);
    }, error => {
      this.error = error.error.errors;
      this.onload = !this.onload;
    });
  }
}
