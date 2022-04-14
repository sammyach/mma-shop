import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {

  items: any[];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;

  form: FormGroup;
  submitted;
  loading = false;

  selectedItem;
  uploadedFiles: any[] = [];
  successfulUpload = false;
  showImgBox = false;
  newProduct = false;

  categories: any;
  selectedCategory: any;

  constructor(public ps: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.getCategories();
    this.getItems();
  }

  getCategories(){
    this.ps.getAllCategories()
      .subscribe(res => {
        this.categories = res;
      })
  }

  getItems(){
    this.ps.getAllProducts()
      .subscribe(res => {
        this.items = res;
      })
  }

  createForm(){
    this.form = this.fb.group({
      id: [null],
      productName: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, Validators.required],
      desc: [null],
      catId: [null]
    });
  }

  addProduct(){
    const data: any = {};
    data.Name = this.form.get('productName').value;
    data.Description = this.form.get('desc').value;
    data.Price = this.form.get('price').value;
    data.Quantity = this.form.get('quantity').value;
    data.CategoryId = this.form.get('catId').value;

    this.ps.addProductItem(data)
      .subscribe(res => {
        if(res.Id){
          this.form.reset();
          this.getItems();
          this.selectedItem = null;
        }
      })
  }

  onSubmit(){
    const data: any = {};
    data.Id = this.form.get('id').value;
    data.Name = this.form.get('productName').value;
    data.Description = this.form.get('desc').value;
    data.Price = this.form.get('price').value;
    data.Quantity = this.form.get('quantity').value;
    this.ps.updateProductItem(data)
      .subscribe(res => {
        if(res.Id){
          this.form.reset();
          this.getItems();
          this.selectedItem = null;
        }
      })
  }

  onEdit(id){
    const item = this.selectedItem = this.items.find(e=>e.Id === id);

    this.form.patchValue({
      id: item.Id,
      productName : item.Name,
      desc: item.Description,
      price: item.Price,
      quantity: item.Quantity,
      catId: item.Category.Id
    })


  }

  onRemove(img){
    this.ps.removeImage(img.Id)
      .subscribe(res => {
        const index = this.selectedItem.ProductImages.indexOf(img);
        if(index > -1){
          this.selectedItem.ProductImages.splice(index, 1);
        }
      })
  }

  onUpload(event){
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
    const formData = new FormData();
    this.uploadedFiles.forEach((f) => formData.append('files', f));

    this.ps.uploadFiles(this.selectedItem.Id, formData)
        .subscribe(res => {
          this.successfulUpload = true;
          this.selectedItem = res;
        })
  }

  toggleImageBox(){
    this.showImgBox = !this.showImgBox;
  }

  toggleNewProduct(){
    this.newProduct = !this.newProduct;
  }

}
