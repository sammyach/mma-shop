import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataService } from 'src/app/data.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-customer-wishlist',
  templateUrl: './customer-wishlist.component.html',
  styleUrls: ['./customer-wishlist.component.scss']
})
export class CustomerWishlistComponent implements OnInit {

  items: any[];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;

  constructor(private ps: ProductService, private ds: DataService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this.ps.getItemsInWishlist()
      .subscribe(res => {
        console.log('favz', res);
        this.items = res;

      })
  }

  onAddToCart(product){
    const data: any = {};
    data.ProductId = product.Id;
    data.Quantity = 1;
    data.ProductName = product.Name;
    data.UnitPrice = product.Price;
    data.ImageUrl = product.ProductImages[0]?.ImageUrl;
    console.log('adding to cart', data);

    this.ds.addToCart(data);
    //this.messageService.add({severity:'success', summary: 'Success', detail: 'Item added to cart successfully'});
  }

  onRemove(id){
    this.ps.removeItemFromWishlist(id)
      .subscribe(res => {
        this.getItems();
      })
  }

}
