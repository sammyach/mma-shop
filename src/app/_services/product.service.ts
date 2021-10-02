import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get<any[]>(`${this.baseUrl}/api/product`);
  }

  getProductById(id){
    return this.http.get<any>(`${this.baseUrl}/api/product/${id}`);
  }

  addShippingInfo(data: any){
    // return this.http.post<any>(`${this.baseUrl}/api`)
  }

  getCustomerById(id){
    return this.http.get<any>(`${this.baseUrl}/api/users/${id}`);
  }

  addNewAddress(data){
    return this.http.post<any>(`${this.baseUrl}/api/users/address/new`, data);
  }

  
}
