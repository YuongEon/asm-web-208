import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Product } from 'src/app/interface/products';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detial',
  templateUrl: './product-detial.component.html',
  styleUrls: ['./product-detial.component.css']
})
export class ProductDetialComponent implements OnInit{

  product : Product | null = null

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({id}) => {
      this.productService.getProduct(id).subscribe((data) => this.product = data)
    })
  }
}
