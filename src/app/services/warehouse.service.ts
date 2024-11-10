import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warehouse } from '../DTOs/warehouseDTO';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  baseURl = ''
  constructor(private client: HttpClient) {
    this.baseURl = environment.apiUrl
  }
  loadAllWarehouses(): Observable<any> {
    return this.client.get(this.baseURl + '/api/Warehouse/loadAllWarehouse')
  }
  addwharehouse(warehouse: Warehouse): Observable<any> {

    return this.client.post(this.baseURl + '/api/Warehouse', warehouse)
  }
  deleteWarehouse(id: number): Observable<any> {
    return this.client.delete(this.baseURl + '/api/Warehouse/deleteWarehouse?id=' + id)
  }
  updateWarehouse(warehouse: Warehouse): Observable<any> {
    return this.client.put(this.baseURl + '/api/Warehouse/updateWarehouse', warehouse)
  }
  getWarehouseById(Id: number): Observable<any> {
    return this.client.get(this.baseURl + '/api/Warehouse/getWarehouseById?Id=' + Id)
  }
  searchByLocation(location: string): Observable<any> {
    return this.client.get(this.baseURl + '/api/Warehouse/searchByLocation?location=' + location)
  }

  // filters
  searchByStatus(status: boolean): Observable<any> {
    return this.client.get(this.baseURl + '/api/Warehouse/searchByStatus?status=' + status)
  }
  searchByCapacity(capacity: number): Observable<any> {
    return this.client.get(this.baseURl + '/api/Warehouse/searchByCapacity?capacity=' + capacity)
  }

}
