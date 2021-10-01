import { Component, ElementRef, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { CartProduct, Product } from '../product';
import { ProductService } from '../product.service';
import { AuthService } from '../_services/auth.service';

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
  products: any[];
  activeLabelBP;
  activeLabelFG;
  activeLabelCF;

  AccountNavClass;

  items;
  accountMenuItems;
  clickedIn = false;

  beautyOverlay;
  foodOverlay;
  fashionOverlay;

  loggedIn = false;
  currentUser: any;
  constructor(private productService: ProductService, private router: Router, private ds : DataService,
              private eRef: ElementRef, private auth: AuthService, private route: ActivatedRoute) { 
                //this.loggedIn = this.auth.loggedIn();
                this.auth.currentUser.subscribe(x => {this.currentUser = x; console.log('headeruser', this.currentUser); if(this.currentUser) this.loggedIn = true;});
              }

  ngOnInit(): void {

    this.accountMenuItems = [{
      
      items: [{
        label: 'My Account',
        icon: 'pi pi-user-edit',
          command: () => {
              //this.update();
          }
      
      }]      
    },
    {
      label: '',
      items: [{
        label: 'Log out',
        icon: 'pi pi-sign-out',
          command: () => {
              this.auth.logout();
          }
      }]
    }]

    this.items = [{
      label: 'Options',
      items: [{
          label: 'Update',
          icon: 'pi pi-refresh',
          command: () => {
              //this.update();
          }
      },
      {
          label: 'Delete',
          icon: 'pi pi-times',
          command: () => {
              //this.delete();
          }
      }
      ]},
      {
          label: 'Navigate',
          items: [{
              label: 'Angular',
              icon: 'pi pi-external-link',
              url: 'http://angular.io'
          },
          {
              label: 'Router',
              icon: 'pi pi-upload',
              routerLink: '/fileupload'
          }
      ]}
  ];
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
    
    console.log('show cart items',this.products);
    
    
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
      cat == '1' ? this.beautyOverlay = false : '';
      cat == '2' ? this.activeLabelCF = 'active' : '';
      cat == '3' ? this.activeLabelFG = 'active' : '';
      // cat == '1' ? this.activeLabelBP = 'active' : '';
      // cat == '2' ? this.activeLabelCF = 'active' : '';
      // cat == '3' ? this.activeLabelFG = 'active' : '';
      this.router.navigate(['/products'], {queryParams: {cat: cat}})
    }
  }

  onToggleAccountNav(){
    this.AccountNavClass = 'active';
    this.clickedIn = true;
    //this.clickedIn = true;
    // if(this.AccountNavClass == 'active'){
    //   this.AccountNavClass = ''
    // }else{
    //   this.AccountNavClass = 'active'
    // }
    //this.clickedIn = true;
    // if($event){
    //   $event.stopPropagation();
    // }
    
  }

  // @HostListener('click')
  // clickIn($event){
  //   this.clickedIn = true;
  //   $event.stopPropagation();
  // }

  // @HostListener('document:click')
  // clickout(){
  //   console.log('element in action ', this.eRef.nativeElement);
    
  //   if(!this.clickedIn){
  //     console.log('in click out');
    
  //     this.onToggleAccountNav(null);
  //   }
  //   this.clickedIn = false;
    
  // }

  onClickedOutside(e: Event) {
    //console.log('Clicked outside:', e);
    this.AccountNavClass = '';
    this.clickedIn = false;
  }

  goToPage(page: string){
    this.router.navigate([page], {queryParams: {redirectUrl: this.route.snapshot.url}});
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
