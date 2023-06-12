import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  createForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(1000)]],
    desc: ['', [Validators.required, Validators.minLength(3)]],
  })

  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: UntypedFormBuilder
  ){}

  onHandleCreate(){
    const newProduct = {
      id: `M${Math.floor(Math.random()) * 10}`,
      name: this.createForm.value.name,
      price: this.createForm.value.price,
      desc: this.createForm.value.desc
    }

    this.productService.createProduct(newProduct).subscribe(
      (data) => {
        alert(`them thanh cong san pham ${data.name}`)
        this.router.navigateByUrl('/products')
      },
      (error) => {
        console.error(error);
      }
    )
  }
}
