import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Products } from '../DTOs/productsDTO';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseURl = ''
  constructor(private client: HttpClient) {
    this.baseURl = environment.apiUrl
  }
  loadAllProducts(): Observable<any> {
    return this.client.get(this.baseURl + '/api/Product/loadAllProduct');
  }
  addProduct(product: Products): Observable<any> {
    debugger
    return this.client.post(this.baseURl + '/api/Product/addProduct', product)
  }
  searchByName(name: string): Observable<any> {
    return this.client.get(this.baseURl + '/api/Product/sreachByName?name=' + name);
  }
  deleteProduct(id: number): Observable<any> {
    return this.client.delete(this.baseURl + '/api/Product/deleteProduct?Id=' + id);
  }
  getProductById(Id: number): Observable<any> {
    return this.client.get(this.baseURl + '/api/Product/getProductById?Id=' + Id);
  }
  updateProduct(product: Products): Observable<any> {
    return this.client.put(this.baseURl + '/api/Product/updateProduct', product);
  }
  loadAllProductsUpperThanZero(): Observable<any> {
    return this.client.get(this.baseURl + '/api/Product/loadAllProductsUpperThanZero');
  }
}
