import {AuthModel} from "../../models/auth.model";

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: AuthModel) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class SignOut {
  static readonly type = '[Auth] SignOut';
}
