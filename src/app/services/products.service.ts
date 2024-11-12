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

  loadAllProductByWarehouseId(warehouseId: number): Observable<any> {
    return this.client.get(this.baseURl + '/api/Product/loadAllProductByWarehouseId?warehouseId=' + warehouseId);
  }

  loadAllProductByWarehouseIdUpperThanZero(warehouseId: number): Observable<any> {
    return this.client.get(this.baseURl + '/api/Product/loadAllProductByWarehouseIdUpperThanZero?warehouseId=' + warehouseId);
  }

  addProduct(product: Products): Observable<any> {

    return this.client.post(this.baseURl + '/api/Product/addProduct', product)
  }
  searchByName(name: string, warehouseId: number): Observable<any> {
    return this.client.get(this.baseURl + `/api/Product/sreachByName?name=${name}&warehouseId=${warehouseId}`);
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

  //filters

  seachByPriceAvarge(min: number, max: number, warehouseId: number): Observable<any> {
    return this.client.get(this.baseURl + `/api/Product/seachByPriceAvarge?min=${min}&max=${max}&warehouseId=${warehouseId}`);
  }
  seachByDec(warehouseId: number): Observable<any> {
    return this.client.get(this.baseURl + '/api/Product/seachByDec?warehouseId=' + warehouseId);
  }
  seachByAce(warehouseId: number): Observable<any> {
    return this.client.get(this.baseURl + '/api/Product/seachByAce?warehouseId=' + warehouseId);
  }

  // for dashboard
  totalProducts(warehouseId: number): Observable<any> {
    return this.client.get(this.baseURl + '/api/Product/totalProducts?warehouseId=' + warehouseId);
  }
  lowerProductStock(warehouseId: number): Observable<any> {
    return this.client.get(this.baseURl + '/api/Product/lowerProductStock?warehouseId=' + warehouseId);
  }

  higherProductStock(warehouseId: number): Observable<any> {
    return this.client.get(this.baseURl + '/api/Product/higherProductStock?warehouseId=' + warehouseId);
  }

}
