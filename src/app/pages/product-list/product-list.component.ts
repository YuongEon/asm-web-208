import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interface/products';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];

  constructor(
    private productService: ProductService,
  ){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => this.products = data)
  }

  onHandleDelete(id:string){
    let isDelete = window.confirm('ban co chac chan muon xoa?')
    isDelete && this.productService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(product => product.id !== id)
        alert('xoa thanh cong san pham')
      },
      (error) => {
        console.error(error);
      }
    )
  }
}
