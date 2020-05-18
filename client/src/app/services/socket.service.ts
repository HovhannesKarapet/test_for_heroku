import {Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";
import {UserModel} from "../models/user.model";
import {CartModel} from "../models/cart.model";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) {
  }

  loggedIn(): Observable<any> {
    return Observable.create((observer) => {
      this.socket.on('login', res => {
        observer.next(res);
      })
    })
  }

  loggedOut(): Observable<any> {
    return Observable.create(observer => {
      this.socket.on('logout', res => {
        observer.next(res);
      })
    })
  }

  makeOrder(data): void {
    this.socket.emit('order', data)
  }

  getNewOrder(): Observable<{ login: string, order: CartModel[] }> {
    return Observable.create(observer => {
      this.socket.on('new_order', res => {
        observer.next(res)
      })
    })
  }

  wantBill(login): void {
    console.log(login);
    this.socket.emit('want_bill', login)
  }

  bill(): Observable<any> {
    return Observable.create(observer => {
      this.socket.on('bill', res => {
        observer.next(res)
      })
    })
  }

  call_waiter(login): void {
    this.socket.emit('call_waiter', login)
  }

  waiter(): Observable<any> {
    return Observable.create(observer => {
      this.socket.on('waiter', res => {
        observer.next(res)
      })
    })
  }
}

