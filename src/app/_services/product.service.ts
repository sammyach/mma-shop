import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;
  public baseImgUrl = environment.baseImgUrl;
  constructor(private http: HttpClient) { }

  searchItem(query){
    return this.http.get<any[]>(`${this.baseUrl}/api/product/item/search?q=${query}`);
  }

  getAllProducts(){
    return this.http.get<any[]>(`${this.baseUrl}/api/product`);
  }

  getProductsByCategory(id){
    return this.http.get<any[]>(`${this.baseUrl}/api/product/category/${id}`);
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

  addItemToWishlist(data){
    return this.http.post<any>(`${this.baseUrl}/api/shopping/wishlist/additem`, data);
  }

  getItemsInWishlist(){
    return this.http.get<any[]>(`${this.baseUrl}/api/shopping/wishlist/items`);
  }

  removeItemFromWishlist(id){
    return this.http.delete<any>(`${this.baseUrl}/api/shopping/wishlist/removeitem/${id}`)

  }

  addProductItem(data){
    return this.http.post<any>(`${this.baseUrl}/api/product/new`, data);
  }

  updateProductItem(data){
    return this.http.patch<any>(`${this.baseUrl}/api/product/update`, data);
  }

  uploadFiles(id, data){
    return this.http.post<any>(`${this.baseUrl}/api/product/images/upload/${id}/files`, data);
  }

  removeImage(id){
    return this.http.delete<any>(`${this.baseUrl}/api/product/images/remove/${id}`);
  }

  getAllCategories(){
    return this.http.get<any[]>(`${this.baseUrl}/api/lovs/categories`);
  }

  getAllOrders(){
    return this.http.get<any[]>(`${this.baseUrl}/api/orders`);
  }

  getAllOrderStatuses(){
    return this.http.get<any[]>(`${this.baseUrl}/api/lovs/orderstatus/all`);
  }

  updateOrderStatus(data){
    return this.http.patch<any>(`${this.baseUrl}/api/orders/updatestatus`, data);
  }

}
