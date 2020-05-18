import {Action, Selector, State, StateContext} from "@ngxs/store";
import {TablesModel} from "../../models/tables.model";
import {
  Bill, ConfirmBill,
  ConfirmOrder, ConfirmWaiterCall,
  Connect,
  NewOrder,
  RemoveTables,
  Reserve,
  SetTables,
  Waiter
} from "../actions/tables.action";
import {CartModel} from "../../models/cart.model";

@State<TablesModel>({
  name: 'tables',
  defaults: {
    tables          : localStorage.getItem('tables') ? JSON.parse(localStorage.getItem('tables')) : null,
    new_orders      : localStorage.getItem('new_orders') ? JSON.parse(localStorage.getItem('new_orders')) : {},
    accepted_orders : localStorage.getItem('accepted_orders') ? JSON.parse(localStorage.getItem('accepted_orders')) : {},
    bill            : localStorage.getItem('bill') ? JSON.parse(localStorage.getItem('bill')) : {},
    waiter          : localStorage.getItem('waiter') ? JSON.parse(localStorage.getItem('waiter')) : {},
  }
})

export class TablesState {

  @Selector()
  static tables(state: TablesModel): object {
    return state.tables
  }

  @Selector()
  static busy_tables(state: TablesModel): number {
    let count = 0;
    for(let key in state.tables) {
      if(state.tables[key].loggedIn) count++;
    }
    return count;
  }

  @Selector()
  static free_tables(state: TablesModel): number {
    let count = 0;
    for(let key in state.tables) {
      if(!state.tables[key].loggedIn && !state.tables[key].reserved) count++;
    }
    return count;
  }

  @Selector()
  static reserved_tables(state: TablesModel): number {
    let count = 0;
    for(let key in state.tables) {
      if(!state.tables[key].loggedIn && state.tables[key].reserved) count++;
    }
    return count;
  }

  @Selector()
  static bill_count(state: TablesModel): number {
    let count = 0;
    for(let key in state.bill) {
      count++;
    }
    return count;
  }

  @Selector()
  static bill(state: TablesModel): object {
    return state.bill
  }

  @Selector()
  static accepted_orders(state: TablesModel): object {
    return state.accepted_orders
  }

  @Selector()
  static new_orders(state: TablesModel): object {
    return state.new_orders
  }

  @Selector()
  static waiter(state: TablesModel): object {
    return state.waiter
  }

  @Action(SetTables)
  setTables({getState, patchState}: StateContext<TablesModel>, payload: SetTables) {
    let tables = getState().tables;
    if(!tables) tables = payload.payload;
    localStorage.setItem('tables', JSON.stringify(tables));
    patchState({tables: tables})
  }

  @Action(Connect)
  connect({getState, patchState}: StateContext<TablesModel>, {payload}: Connect) {
    let tables = getState().tables;
    tables[payload.login].loggedIn = payload.loggedIn;
    tables[payload.login].blink = false;
    localStorage.setItem('tables', JSON.stringify(tables));
    patchState({
      tables: tables
    })
  }

  @Action(Reserve)
  reserve({getState, patchState}: StateContext<TablesModel>, {payload}: Reserve) {
    let tables = getState().tables;
    tables[payload.login].reserved = payload.reserved;
    localStorage.setItem('tables', JSON.stringify(tables));
    patchState({
      tables: tables
    })
  }

  @Action(NewOrder)
  newOrder({getState, patchState}: StateContext<TablesModel>, {payload}: NewOrder) {
    let new_orders = getState().new_orders;
    let tables = getState().tables;
    new_orders[payload.login] = payload.order;
    tables[payload.login].blink = true;
    localStorage.setItem('tables', JSON.stringify(tables));
    localStorage.setItem('new_orders', JSON.stringify(new_orders));
    console.log(payload);
    patchState({
      new_orders: new_orders,
      tables: tables
    })
  }

  @Action(ConfirmOrder)
  confirmOrder({getState, patchState}: StateContext<TablesModel>, payload: ConfirmOrder) {
    let new_orders = getState().new_orders;
    let accepted_orders = getState().accepted_orders;
    let tables = getState().tables;
    console.log(accepted_orders);
    console.log(new_orders);
    accepted_orders[payload.login] ? accepted_orders[payload.login] = [...accepted_orders[payload.login], ...new_orders[payload.login]] : accepted_orders[payload.login] = new_orders[payload.login]
    delete new_orders[payload.login];
    tables[payload.login].blink = false;
    console.log(accepted_orders);
    localStorage.setItem('tables', JSON.stringify(tables));
    localStorage.setItem('new_orders', JSON.stringify(new_orders));
    localStorage.setItem('accepted_orders', JSON.stringify(accepted_orders));
    patchState({
      new_orders: new_orders,
      accepted_orders: accepted_orders,
      tables: tables
    })
  }

  @Action(Bill)
  bill({getState, patchState}: StateContext<TablesModel>, payload: Bill) {
    let new_orders = getState().new_orders;
    let accepted_orders = getState().accepted_orders;
    let bill = getState().bill;
    let tables = getState().tables;

    if(accepted_orders[payload.login] && new_orders[payload.login]) bill[payload.login] = [...accepted_orders[payload.login], ...new_orders[payload.login]];
    else if(accepted_orders[payload.login]) bill[payload.login] = accepted_orders[payload.login];
    else if(new_orders[payload.login]) bill[payload.login] = new_orders[payload.login];
    else bill[payload.login] = [];
    delete accepted_orders[payload.login];
    delete new_orders[payload.login];

    tables[payload.login].blink = false;
    localStorage.setItem('tables', JSON.stringify(tables));
    localStorage.setItem('new_orders', JSON.stringify(new_orders));
    localStorage.setItem('accepted_orders', JSON.stringify(accepted_orders));
    localStorage.setItem('bill', JSON.stringify(bill));

    patchState({
      tables: tables,
      new_orders: new_orders,
      accepted_orders: accepted_orders,
      bill: bill
    })
  }

  @Action(ConfirmBill)
  confirmBill({getState, patchState}: StateContext<TablesModel>, payload: ConfirmBill) {
    let bill = getState().bill;

    delete bill[payload.login];
    localStorage.setItem('waiter', JSON.stringify(bill));

    patchState({
      bill: bill
    })
  }

  @Action(Waiter)
  waiter({getState, patchState}: StateContext<TablesModel>, payload: Waiter) {
    let waiter = getState().waiter;

    waiter[payload.login] = true;
    localStorage.setItem('waiter', JSON.stringify(waiter));

    patchState({
      waiter: waiter
    })
  }

  @Action(ConfirmWaiterCall)
  confirmWaiterCall({getState, patchState}: StateContext<TablesModel>, payload: ConfirmWaiterCall) {
    let waiter = getState().waiter;

    delete waiter[payload.login];
    localStorage.setItem('waiter', JSON.stringify(waiter));

    patchState({
      waiter: waiter
    })
  }

  @Action(RemoveTables)
  remove({setState}: StateContext<TablesModel>) {
    setState({
      tables          : null,
      new_orders      : {},
      accepted_orders : {},
      bill            : {},
      waiter          : {}
    });
    localStorage.removeItem('tables');
    localStorage.removeItem('new_orders');
    localStorage.removeItem('accepted_orders');
    localStorage.removeItem('bill');
  }
}
