import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  //_subscription: Subscription;
  products: Product[];

  subTotal;
  total;
  shipping = 'N/A';

  checked;

    constructor(private ds: DataService) { }

    ngOnInit() {
      
      // this._subscription = this.ds.getItems().subscribe((data)=>{
      //   console.log('data', data);
        
      //   this.products = data;
      // })

      console.log('cart', this.ds.shoppingCartItems);
      this.products = this.ds.shoppingCartItems;    
      
      this.calculateTotals();
        
        
    }

    calculateTotals(){
      this.total = this.subTotal = 0;

      this.subTotal = this.products.reduce((a,b)=> a + (b.price * b.quantity), 0);
      if(this.products){
        console.log('sub total = ', this.subTotal);
      }
      this.total = this.subTotal;
    }

    // public ngOnDestroy(): void {
    //   this._subscription.unsubscribe();
    // }

}
