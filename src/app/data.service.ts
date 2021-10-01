import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartProduct, Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  subTotal = 0;
  total = 0;

  productsStoredFromIndex: any[] = [];

  shoppingCart: Product[] = [];
  shoppingCartItems: CartProduct[] = [];

  private _subject = new Subject<any[]>();

  addToCart(item: any){
    let itemToBeAddedToCart = {} as CartProduct;
    itemToBeAddedToCart.productId = item.Id;
    itemToBeAddedToCart.name = item.Name;
    itemToBeAddedToCart.image = item.ProductImages[0].ImageUrl;
    itemToBeAddedToCart.price = item.Price;
    itemToBeAddedToCart.quantity = 1;

    console.log('ds => item to be added', itemToBeAddedToCart );
    // this.shoppingCartItems.push(itemToBeAddedToCart);
    // this.shoppingCart.push(item);
    
    let index = this.shoppingCartItems.findIndex(x=>x.productId == itemToBeAddedToCart.productId);
    console.log('indx', index);
    
    if(index === -1){
      console.log('indx not found. pushing to cart', index);
      this.shoppingCartItems.push(itemToBeAddedToCart) 
    }else{
      console.log('indx found. calculating qty', index);
      this.shoppingCartItems[index].quantity = this.shoppingCartItems[index].quantity + 1;
    }
    // index === -1 ? this.shoppingCartItems.push(itemToBeAddedToCart) : this.shoppingCartItems[index].quantity = this.shoppingCartItems[index].quantity + 1;
    //this.shoppingCart.push(item);
    console.log('from ds shpCart', this.shoppingCart);
    console.log('from ds shpCart items', this.shoppingCartItems);
    
    this._subject.next(this.shoppingCartItems);
  }

  getItems(): Observable<any[]> {
    return this._subject.asObservable();
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
    this.subTotal = 0;

    this.subTotal = this.shoppingCartItems.reduce((a,b)=> a + (b.price * b.quantity), 0);
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



  constructor() { }
}
