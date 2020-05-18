import {Action, Selector, State, StateContext} from "@ngxs/store";
import {CartModel} from "../../models/cart.model";
import {OrdersModel} from "../../models/orders.model";
import {Add, RemoveAllOrders} from "../actions/orders.action";

@State<OrdersModel>({
  name: 'orders',
  defaults: {
    service_fee: localStorage.getItem('service_fee') ? JSON.parse(localStorage.getItem('service_fee')) : 0,
    total_sum: localStorage.getItem('total_sum') ? JSON.parse(localStorage.getItem('total_sum')) : 0,
    orders: localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : []
  }
})

export class OrdersState {

  @Selector()
  static orders(state: OrdersModel): CartModel[] {
    return state.orders
  }

  @Selector()
  static total_sum(state: OrdersModel): number {
    return state.total_sum
  }

  @Selector()
  static service_fee(state: OrdersModel): number {
    return state.service_fee
  }

  @Action(Add)
  add({getState, setState}: StateContext<OrdersModel>, {payload}: Add) {
    let orders = getState().orders;
    let total_sum = getState().total_sum;
    let service_fee = getState().service_fee;
    orders = [...orders, ...payload.orders];
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('service_fee', JSON.stringify(service_fee + payload.service_fee));
    localStorage.setItem('total_sum', JSON.stringify(total_sum + payload.total_sum));
    setState({
      total_sum: total_sum + payload.total_sum,
      service_fee: service_fee + payload.service_fee,
      orders: orders
    })
  }

  @Action(RemoveAllOrders)
  removeAllOrders({setState}: StateContext<OrdersModel>) {
    setState({
      service_fee: 0,
      total_sum: 0,
      orders: []
    });
    localStorage.removeItem('orders');
    localStorage.removeItem('service_fee');
    localStorage.removeItem('total_sum');
  }
}
