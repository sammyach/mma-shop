import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { ProductService } from '../_services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedCategory: string;
  products: any[];
  responsiveOptions;

  constructor(private route: ActivatedRoute, public ps: ProductService, private router: Router, private ds: DataService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['cat'];
      console.log('home - selected cat: ', this.selectedCategory);
      this.getAllProductItems(this.selectedCategory);
    });


  }

  getAllProductItems(cat){
    this.ps.getAllProducts()
      .subscribe(res => {
        console.log(res);

        this.products = res;
        //this.ds.productsStoredFromIndex = this.products;
      })
  }

  onAddToFavorites(id){
    console.log(id);
    const data = {} as any;
    data.ProductId = id;
    this.ps.addItemToWishlist(data)
      .subscribe(res =>{
        console.log(res);
      }, error => {
        console.log(error);

      })
  }

  onViewDetails(id){
    console.log('details...', id);
    this.router.navigate(['/product', id, 'details']);
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


  // onAddToCart(product){
  //   this.ds.addToCart(product);
  //   //this.messageService.add({severity:'success', summary: 'Success', detail: 'Item added to cart successfully'});
  // }

}
