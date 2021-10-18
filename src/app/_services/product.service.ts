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
    return this.http.post<any>(`${this.baseUrl}/api/shopping/add/shippingaddress`, data);
  }

  // getCustomerById(id){
  //   return this.http.get<any>(`${this.baseUrl}/api/users/${id}`);
  // }

  getCustomerWithAddressesById(id){
    return this.http.get<any>(`${this.baseUrl}/api/users/withaddresses/${id}`);
  }

  getAllCustomerOrders(){
    return this.http.get<any>(`${this.baseUrl}/api/users/orders/all`);
  }

  addNewAddress(data){
    return this.http.post<any>(`${this.baseUrl}/api/users/address/new`, data);
  }

  placeOrder(data){
    return this.http.post<any>(`${this.baseUrl}/api/shopping/place/order`, data);
  }

  getOrderById(id){
    return this.http.get<any>(`${this.baseUrl}/api/shopping/order/${id}`);
  }

  fulfillPayment(data){
    return this.http.put<any>(`${this.baseUrl}/api/shopping/order/fulfillpayment`, data);
  }

  addItemToCart(data){
    return this.http.post<any>(`${this.baseUrl}/api/shopping/cart/additems`, data);
  }

  getItemsInCart(){
    return this.http.get<any[]>(`${this.baseUrl}/api/shopping/cart/items`);
  }

  cancelOrder(id){
    return this.http.patch<any>(`${this.baseUrl}/api/shopping/order/cancel`, {id});
  }


}
