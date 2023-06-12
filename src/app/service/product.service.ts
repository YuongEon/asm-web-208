import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  api: string = 'http://localhost:3000/products';
  constructor(public http : HttpClient) { }

  getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.api}`)
  }
  getProduct(id:string) : Observable<Product>{
    return this.http.get<Product>(`${this.api}/${id}`)
  }
  createProduct(product: Product) : Observable<Product>{
    return this.http.post<Product>(`${this.api}`, product)
  }
  updateProduct(id:string, product:Product) : Observable<Product>{
    return this.http.put<Product>(`${this.api}/${id}`, product)
  }
  deleteProduct(id:string) : Observable<Product>{
    return this.http.delete<Product>(`${this.api}/${id}`)
  }
}
