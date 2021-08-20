import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { CartProduct, Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  _subscription: Subscription;
  totalItemsInCart = 0;
  item_qty=1;
  displayDialog = false;
  products: Product[];
  activeLabelBP;
  activeLabelFG;
  activeLabelCF;
  
  constructor(private productService: ProductService, private router: Router, private ds : DataService) { }

  ngOnInit(): void {
    this._subscription = this.ds.getItems().subscribe((data)=>{
      this.products = data;

      // + operator for casting to Number
      // items.reduce((a, b) => +a + +b.price, 0);

      
      this.totalItemsInCart = this.products.reduce((a, b) => +a + +b.quantity, 0);
    })
    // this.productService.getProducts().then(data => this.products = data.slice(0,3));
    // this.totalItemsInCart = this.ds.shoppingCart.length;
  }

  onShowCart(){
    if(this.totalItemsInCart > 0){
      this.displayDialog = true;
    }
    
    console.log(this.products);
    
    
  }

  onToggle(){

  }

  onViewCart(){
    this.displayDialog = false;
    this.router.navigate(['/cart']);
  }

  onFilterCategory(cat){
    this.activeLabelBP = this.activeLabelCF = this.activeLabelFG = '';
    if(cat){
      cat == 'BP' ? this.activeLabelBP = 'active' : '';
      cat == 'CF' ? this.activeLabelCF = 'active' : '';
      cat == 'FG' ? this.activeLabelFG = 'active' : '';
      this.router.navigate(['/products'], {queryParams: {cat: cat}})
    }
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
