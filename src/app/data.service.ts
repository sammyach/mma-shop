import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartProduct, Product } from './product';
import { ProductService } from './_services/product.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  subTotal = 0;
  total = 0;

  //productsStoredFromIndex: any[] = [];

  //shoppingCart: Product[] = [];
  //shoppingCartItems: CartProduct[] = [];
  public shoppingCartItems: any[] = [];

  private _subject = new Subject<any[]>();

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private ps: ProductService) { }

  // addToCart(item: any){
  //   let itemToBeAddedToCart = {} as CartProduct;
  //   itemToBeAddedToCart.productId = item.Id;
  //   itemToBeAddedToCart.name = item.Name;
  //   itemToBeAddedToCart.image = item.ProductImages[0].ImageUrl;
  //   itemToBeAddedToCart.price = item.Price;
  //   itemToBeAddedToCart.quantity = 1;

  //   console.log('ds => item to be added', itemToBeAddedToCart );
  //   // this.shoppingCartItems.push(itemToBeAddedToCart);
  //   // this.shoppingCart.push(item);

  //   let index = this.shoppingCartItems.findIndex(x=>x.productId == itemToBeAddedToCart.productId);
  //   console.log('indx', index);

  //   if(index === -1){
  //     console.log('indx not found. pushing to cart', index);
  //     this.shoppingCartItems.push(itemToBeAddedToCart)
  //   }else{
  //     console.log('indx found. calculating qty', index);
  //     this.shoppingCartItems[index].quantity = this.shoppingCartItems[index].quantity + 1;
  //   }
  //   // index === -1 ? this.shoppingCartItems.push(itemToBeAddedToCart) : this.shoppingCartItems[index].quantity = this.shoppingCartItems[index].quantity + 1;
  //   //this.shoppingCart.push(item);
  //   //onsole.log('from ds shpCart', this.shoppingCart);
  //   console.log('from ds shpCart items', this.shoppingCartItems);

  //   //save cart in localstorage
  //   localStorage.setItem('cart', JSON.stringify(this.shoppingCartItems));

  //   this._subject.next(this.shoppingCartItems);
  // }

  addToCart(data){
    this.http.post<any>(`${this.baseUrl}/api/shopping/cart/additems`, data)
      .subscribe(res=>{
        console.log('after adding to cart', res);
        //this.shoppingCartItems = res.CartItems;
        //this._subject.next(this.shoppingCartItems);
        sessionStorage.setItem('uuid', res.Uuid);

        this.getCartItems();
        // this.ps.getItemsInCart()
        //   .subscribe(res =>{
        //     this.shoppingCartItems = res;
        //   } )
        //return res;
      });
  }

  getCartItems(){
    this.http.get<any[]>(`${this.baseUrl}/api/shopping/cart/items`)
      .subscribe(res => {
        this.shoppingCartItems = res;
        this._subject.next(this.shoppingCartItems);
      })
  }

  getItems(): Observable<any[]> {
    return this._subject.asObservable();
  }

  removeItem(id){
    this.http.delete<any>(`${this.baseUrl}/api/shopping/cart/removeitem/${id}`)
      .subscribe(res => {
        this.getCartItems();
      })
  }

  emptyCart(){
    this.http.delete<any>(`${this.baseUrl}/api/shopping/cart/items/empty`)
      .subscribe(res => {
        this.shoppingCartItems = [];
        //localStorage.removeItem('cart');
        this._subject.next(this.shoppingCartItems);
      })

  }

  calculateTotals(){
    this.total = this.subTotal = 0;

    this.subTotal = this.shoppingCartItems.reduce((a,b)=> a + (b.price * b.quantity), 0);
    if(this.shoppingCartItems){
      console.log('sub total = ', this.subTotal);
    }
    this.total = this.subTotal;
  }

  calculateSubTotal(){
    console.log('calculating subtotal', this.shoppingCartItems);

    this.subTotal = 0;

    this.subTotal = this.shoppingCartItems.reduce((a,b)=> a + (b.UnitPrice * b.Quantity), 0);
    if(this.shoppingCartItems){
      console.log('sub total = ', this.subTotal);
    }

    return this.subTotal;
    //this.total = this.subTotal;
  }



  get SubTotal(){
    return this.subTotal;
  }

  get Total(){
    return this.Total;
  }




}
