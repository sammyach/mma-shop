import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  qty: number = 1;
  product: Product;
  products: Product[]=[];
  sub;

  constructor(private route: ActivatedRoute, private ps: ProductService, private ds: DataService) { }
  

  ngOnInit(): void {

    console.log('data from ds ',this.ds.productsStoredFromIndex);
     
    //this.ps.getProductById(1);
    // this.ps.getProducts("BF").then(data => console.log('data', data));
    // console.log('products', this.products);

    // this.route.queryParams.subscribe(params => {
    //   this.selectedCategory = params['cat'];
    //   console.log('selected cat: ', this.selectedCategory);
    //   this.productService.getProducts(this.selectedCategory).then(data => this.products = data);
    // });

  //   this.route.paramMap.subscribe(params => { 
  //     console.log(params);
  //      let id = params.get('id'); 
  //      //let products: Product[]=[];
  //      this.ps.getProducts('BF').then(data => this.products = data);
  //      console.log('products', this.products);
       
  //      //this.product=products.find(p => p.id == id);    
  //  });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
