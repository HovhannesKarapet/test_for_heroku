import {CartModel} from "./cart.model";

export interface OrdersModel {
  orders: CartModel[],
  service_fee: number,
  total_sum: number
}
