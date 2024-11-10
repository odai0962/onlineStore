import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../DTOs/orderDTO';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseURl = ''
  constructor(private client: HttpClient) {
    this.baseURl = environment.apiUrl
  }

  loadAllOrders(): Observable<any> {
    return this.client.get(this.baseURl + '/api/Order/loadAllOrder')
  }
  searchByAddress(address: string): Observable<any> {
    return this.client.get(this.baseURl + '/api/Order/getOrderByAddress?address=' + address);
  }
  deleteOrder(id: number): Observable<any> {
    return this.client.delete(this.baseURl + '/api/Order/deleteOrder?Id=' + id);
  }
  getOrderById(Id: number): Observable<any> {
    return this.client.get(this.baseURl + '/api/Order/getOrderById?Id=' + Id);
  }
  addOrder(order: Order): Observable<any> {
    return this.client.post(this.baseURl + '/api/Order/addOrder?orderDTO=', order);
  }

  updateOrder(order: Order): Observable<any> {
    return this.client.put(this.baseURl + '/api/Order/updateOrder?orderDTO=', order);
  }
}
