import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductsService } from '../services/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver {
  constructor(private productService: ProductsService) {}

  resolve: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
    const id = route.paramMap.get('id');
  
    if (id) {
      return this.productService.getProducts().pipe(
        map(response=> response.data.find(item => item.id === id)),
        catchError(() => of(null)) 
      );
    } else {
      return of(null); 
    }
  };
}