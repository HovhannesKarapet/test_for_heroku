import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Login, Logout, SignOut} from "../actions/auth.actions";
import {AuthModel} from "../../models/auth.model";
import {UserModel} from "../../models/user.model";

@State<AuthModel>({
  name: 'auth',
  defaults: {
    token : localStorage.getItem('token') ? localStorage.getItem('token') : null,
    user  : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    role  : localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null,
    logout: localStorage.getItem('signOut') ? JSON.parse(localStorage.getItem('signOut')) : false,
  }
})

export class AuthState {

  @Selector()
  static user(state: AuthModel): string | null {
    return state.user._id
  }

  @Selector()
  static token(state: AuthModel): string | null {
    return state.token
  }

  @Selector()
  static isAuthenticated(state: AuthModel): boolean {
    return !!state.token
  }

  @Selector()
  static isClient(state: AuthModel): boolean {
    return !!state.role.is_guest
  }

  @Selector()
  static isAdmin(state: AuthModel): boolean {
    return !!state.role.is_admin
  }

  @Selector()
  static isEmployee(state: AuthModel): boolean {
    return !!state.role.is_employee
  }

  @Selector()
  static login(state: AuthModel): string {
    return state.user.login
  }

  @Selector()
  static signOut(state: AuthModel): boolean {
    return state.logout
  }

  @Action(Login)
  login({getState, patchState}: StateContext<AuthModel>, {payload}: Login) {
    patchState(payload)
  }

  @Action(SignOut)
  signOut({patchState}: StateContext<AuthModel>) {
    localStorage.setItem('signOut', JSON.stringify(true));
    patchState({
      logout: true
    })
  }

  @Action(Logout)
  logout({setState}: StateContext<AuthModel>) {
    localStorage.clear();
    setState({
      token : null,
      user  : null,
      role  : null,
      logout: false
      });
  }
}
