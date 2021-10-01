import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Product } from '../product';
import { ProductService } from '../_services/product.service';
// import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  qty: number = 1;
  product: any;
  products: Product[]=[];
  sub;

  constructor(private route: ActivatedRoute, private ps: ProductService, private ds: DataService) { }
  

  ngOnInit(): void {

    console.log('data from ds ',this.ds.productsStoredFromIndex);
    
    this.route.paramMap.subscribe(params => {
      console.log('params', params);
      
      let id:number = +params.get('id');
      console.log('id', id);
      this.getProductData(id);
    })
    
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

  getProductData(id: number){
    this.ps.getProductById(id)
      .subscribe(res => {
        console.log('res', res);
        
        this.product = res;
      })
  }

  onAddToCart(product){
    this.ds.addToCart(product);
    //this.messageService.add({severity:'success', summary: 'Success', detail: 'Item added to cart successfully'});
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}
