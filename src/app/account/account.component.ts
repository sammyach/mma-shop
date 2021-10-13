import { Component, OnInit } from '@angular/core';
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

  displayAddAddressModal = false;
  constructor(private ps: ProductService, private auth: AuthService) {
    this.auth.currentUser.subscribe(x => {this.currentUser = x;});

   }

  ngOnInit(): void {
    this.customer = this.ps.getCustomerWithAddressesById(this.currentUser?.id)
      .subscribe(res=>{
        this.customer = res;        
        
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
  


}
