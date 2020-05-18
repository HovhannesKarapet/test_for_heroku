import {CartModel} from "../../models/cart.model";

export class SetTables {
  static readonly type = '[Tables] SetTables';

  constructor(public payload: object) {
  }
}

export class Connect {
  static readonly type = '[Tables] Connect';

  constructor(public payload: {loggedIn: boolean, login: string}) {
  }
}

export class Reserve {
  static readonly type = '[Tables] Connect';

  constructor(public payload: {reserved: boolean, login: string}) {
  }
}

export class NewOrder {
  static readonly type = '[Tables] NewOrder';

  constructor(public payload: {login: string, order: CartModel[]}) {
  }
}

export class ConfirmOrder {
  static readonly type = '[Tables] ConfirmOrder';

  constructor(public login: string) {
  }
}

export class Bill {
  static readonly type = '[Tables] Bill';

  constructor(public login: string) {
  }
}

export class ConfirmBill {
  static readonly type = '[Tables] ConfirmBill';

  constructor(public login: string) {
  }
}

export class Waiter {
  static readonly type = '[Tables] Waiter';

  constructor(public login: string) {
  }
}

export class ConfirmWaiterCall {
  static readonly type = '[Tables] ConfirmWaiterCall';

  constructor(public login: string) {
  }
}

export class RemoveTables {
  static readonly type = '[Tables] RemoveTables'
}
