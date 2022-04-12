import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  customer;
  currentUser;
  orders;

  title;
  showOrdersView = false;
  showOrderDetailView = false;
  showAccountView = false;
  showWishlistView = false;

  orderIdToView;

  displayAddAddressModal = false;
  constructor(private ps: ProductService, private auth: AuthService, private route: ActivatedRoute) {
    this.auth.currentUser.subscribe(x => {this.currentUser = x;});

   }

  ngOnInit(): void {
    console.log('in acc');
    this.title = 'Account Overview';

    this.route.queryParams.subscribe(params => {
      const param: string = params['q'];
      if(param){
        this.title = param;
        if(this.title === 'My Account') this.title = 'Account Overview';
      }
      this.view(this.title);


    });

    this.customer = this.ps.getCustomerWithAddressesById(this.currentUser?.id)
      .subscribe(res=>{
        this.customer = res;
        console.log('cux', this.customer);
      })

      this.getCustomerOrders();
  }

  editAccountDetails(){
    console.log('edit acc det');

  }

  toggleAddAddressModal(){
    this.displayAddAddressModal = !this.displayAddAddressModal;
  }

  reloadCustomerData(customer: any){
    console.log('reload...', customer);
    this.displayAddAddressModal = false;
    this.customer = customer;
  }

  getCustomerOrders(){
    this.ps.getAllCustomerOrders()
    .subscribe(res => {
      this.orders = res.Orders;
    })
  }

  view(title){
    console.log('in view, wat i title', title);

    this.showOrdersView  = this.showOrderDetailView = this.showAccountView = this.showWishlistView = false;
    this.title = title;

    if(title === 'My Orders') this.showOrdersView = true;
    if(title === 'Order Details') this.showOrderDetailView = true;
    if(title === 'Account Overview') this.showAccountView = true;
    if(title === 'My Wishlist') this.showWishlistView = true;

  }

  viewOrderById(){
    this.view
  }

  onViewOrderDetail(id){
    this.orderIdToView = id;
    this.view('Order Details');

  }



}
