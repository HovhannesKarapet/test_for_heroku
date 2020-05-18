import {UserModel} from "./user.model";

export interface AuthModel {
  token : string,
  user  : UserModel,
  role  : {
    is_admin    : boolean,
    is_employee : boolean,
    is_guest    : boolean
  },
  logout: boolean
}
