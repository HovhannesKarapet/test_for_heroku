import {Action, Selector, State, StateContext} from "@ngxs/store";
import {CartModel} from "../../models/cart.model";
import {Add, Remove, RemoveAll} from "../actions/cart.actions";

@State<CartModel[]>({
  name: 'cart',
  defaults: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
})

export class CartState {

  @Selector()
  static cart(state: CartModel[]): CartModel[] {
    return state
  }

  @Selector()
  static count(state: CartModel[]): number {
    return state.length
  }

  @Action(Add)
  add({setState}: StateContext<CartModel[]>, {payload}: Add) {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    cart.push(payload);
    localStorage.setItem('cart', JSON.stringify(cart));
    setState(cart)
  }

  @Action(Remove)
  remove({setState}: StateContext<CartModel[]>, {payload}: Remove) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(payload, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    setState(cart)
  }

  @Action(RemoveAll)
  removeAll({setState}: StateContext<CartModel[]>) {
    setState([]);
    localStorage.removeItem('cart');
  }
}
