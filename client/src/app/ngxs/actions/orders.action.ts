import {OrdersModel} from "../../models/orders.model";

export class Add {
  static readonly type = '[Orders] Add';

  constructor(public payload: OrdersModel) {
  }
}

export class RemoveAllOrders {
  static readonly type = '[Orders] RemoveAll';
}
