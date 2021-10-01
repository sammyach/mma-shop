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

  constructor(private route: ActivatedRoute, private ps: ProductService, private router: Router, private ds: DataService) { }

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

  onViewDetails(id){
    console.log('details...', id);
    this.router.navigate(['/product', id, 'details']);
  }

  onAddToCart(product){
    this.ds.addToCart(product);
    //this.messageService.add({severity:'success', summary: 'Success', detail: 'Item added to cart successfully'});
  }

}
