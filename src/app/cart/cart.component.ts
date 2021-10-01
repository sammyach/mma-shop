import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { Product } from '../product';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  //_subscription: Subscription;
  products: Product[];

  subTotal=0;
  total=0;
  shipping = 'N/A';

  checked;

  loggedIn = false;
  currentUser: any;

    constructor(private ds: DataService, private router: Router, private auth: AuthService, private route: ActivatedRoute) {
      this.auth.currentUser.subscribe(x => {this.currentUser = x; console.log('headeruser', this.currentUser); if(this.currentUser) this.loggedIn = true;});

     }

    ngOnInit() {
      
      // this._subscription = this.ds.getItems().subscribe((data)=>{
      //   console.log('data', data);
        
      //   this.products = data;
      // })

      console.log('cart', this.ds.shoppingCartItems);
      this.products = this.ds.shoppingCartItems;    
      
      //this.calculateTotals();
      this.total = this.subTotal = this.ds.calculateSubTotal();
        
        
    }

    calculateTotals(){
      this.total = this.subTotal = 0;

      this.subTotal = this.products.reduce((a,b)=> a + (b.price * b.quantity), 0);
      if(this.products){
        console.log('sub total = ', this.subTotal);
      }
      this.total = this.subTotal;
    }

    checkout(){

      if(!this.loggedIn){
        this.router.navigate(['login'], {queryParams: {redirectUrl: this.route.snapshot.url}});
        return;
      }
      this.router.navigate(['checkout']);
    }

    // public ngOnDestroy(): void {
    //   this._subscription.unsubscribe();
    // }

}
