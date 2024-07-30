import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url = environment.API_URL;
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Response<Product[]>> {
    return this.http.get<Response<Product[]>>(`${this.url}/bp/products`);
  }

  saveProduct(data: Product) {
    return this.http.post<Response<Product>>(`${this.url}/bp/products`, data);
  }

  updateProduct(data: Product) {
    return this.http.put<Response<Product>>(`${this.url}/bp/products/${data.id}`, data);
  }

  verifyProductId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/bp/products/verification/${id}`);
  }


  deleteProduct(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/bp/products/${id}`);
  }
}
