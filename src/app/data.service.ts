import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartProduct, Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  productsStoredFromIndex: Product[] = [];

  shoppingCart: Product[] = [];
  shoppingCartItems: CartProduct[] = [];

  private _subject = new Subject<Product[]>();

  addToCart(item: Product){
    let itemToBeAddedToCart = {} as CartProduct;
    itemToBeAddedToCart.productId = item.id;
    itemToBeAddedToCart.name = item.name;
    itemToBeAddedToCart.image = item.image;
    itemToBeAddedToCart.price = item.price;
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

  getItems(): Observable<Product[]> {
    return this._subject.asObservable();
  }



  constructor() { }
}
