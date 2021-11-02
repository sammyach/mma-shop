import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { Product } from '../product';
import { AuthService } from '../_services/auth.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewChecked {
  //_subscription: Subscription;
  products: any[];

  subTotal=0;
  total=0;
  shipping = 'N/A';

  checked;

  loggedIn = false;
  currentUser: any;

  loadingCartItems;
  loadingCartSummary;
    constructor(private ds: DataService, private router: Router, private auth: AuthService, private route: ActivatedRoute, public ps: ProductService) {
      this.auth.currentUser.subscribe(x => {this.currentUser = x; console.log('headeruser', this.currentUser); if(this.currentUser) this.loggedIn = true;});

     }

    ngOnInit() {


      // this._subscription = this.ds.getItems().subscribe((data)=>{
      //   console.log('data', data);

      //   this.products = data;
      // })

      //console.log('cart', this.ds.shoppingCartItems);
      //this.products = this.ds.shoppingCartItems;
      // this.ps.getItemsInCart()
      //   .subscribe(res => {
      //     this.products = res;
      //     this.total = this.subTotal = this.products?.reduce((a,b)=> a + (b.UnitPrice * b.Quantity), 0);
      //   })

      this.loadItems();

      //this.calculateTotals();
      // this.total = this.subTotal = this.ds.calculateSubTotal();




    }

    ngAfterViewChecked(){

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

      if(!this.auth.loggedIn){
        this.router.navigate(['login'], {queryParams: {redirectUrl: this.route.snapshot.url}});
        return;
      }
      this.router.navigate(['checkout']);
    }

    modifyQty(product, qty){
      if(qty == -1 && product.Quantity == 0){ // dont decrease below zero
        console.log('hit min quantity');

        return;
      }
      if(qty == -1 && product.Quantity == 1){
        //remove item from cart
        console.log('removing item', product.ProductId);

        this.ds.removeItem(product.ProductId);
      }
      const data: any = {};
      data.ProductId = product.ProductId;
      data.Quantity = qty;
      data.ProductName = product.ProductName;
      data.UnitPrice = product.UnitPrice;
      data.ImageUrl = product.ImageUrl;
      console.log('adding to cart', data);

      this.ds.addToCart(data);
    }

    emptyCart(){
      this.ds.emptyCart();
      this.router.navigate(['/']);
    }

    loadItems(){
      this.loadingCartItems = this.loadingCartSummary = true;
      this.ds.getCartItems();
      this.ds.getItems()
      .subscribe(res => {
        this.loadingCartItems = this.loadingCartSummary = false;

        this.products = res;
        this.total = this.subTotal = this.products?.reduce((a,b)=> a + (b.UnitPrice * b.Quantity), 0);
      }, error =>{
        this.loadingCartItems = this.loadingCartSummary = false;
        console.log(error);

      })
    }

    // public ngOnDestroy(): void {
    //   this._subscription.unsubscribe();
    // }

}
