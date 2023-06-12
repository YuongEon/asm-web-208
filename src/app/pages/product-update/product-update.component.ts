import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Product } from 'src/app/interface/products';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit{
  product!: Product;

  updateForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(1000)]],
    desc: ['', [Validators.required, Validators.minLength(3)]],
  })

  constructor(
    private formBuilder: UntypedFormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({id}) => {
      this.productService.getProduct(id).subscribe((data) => {
        this.product = data;
        this.updateForm.patchValue({
          name: this.product?.name,
          price: this.product?.price,
          desc: this.product?.desc,
        })
      })
    })
  }

  onHandleUpdate(id:string){
    const newData = {
      ...this.product,
      name: this.updateForm.value.name,
      price: this.updateForm.value.price,
      desc: this.updateForm.value.desc,
    }

    this.productService.updateProduct(id, newData).subscribe(
      (data) => {
        alert(`cap nhat thanh cong san pham ${data.name}`)
        this.router.navigateByUrl('/products');
      },
      (error) => {
        console.error(error);
      }
    )
  }
}

