import {CartModel} from "../../models/cart.model";

export class Add {
  static readonly type = '[Cart] Add';

  constructor(public payload: CartModel) {
  }
}

export class Remove {
  static readonly type = '[Cart] Remove';

  constructor(public payload: number) {
  }
}

export class RemoveAll {
  static readonly type = '[Cart] RemoveAll';
}
