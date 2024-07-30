import { TestBed } from '@angular/core/testing';

import { ProductResolver } from './product.resolver';
import { ProductsService } from '../services/products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('ProductResolver', () => {
  let resolver: ProductResolver;
  let route: ActivatedRouteSnapshot;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });
    resolver = TestBed.inject(ProductResolver);
    route = new ActivatedRouteSnapshot();
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

});
