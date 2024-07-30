import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { productsMock, responseProductsMock } from 'mocks/products.mock';
import { Router } from '@angular/router';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductsService;
  let router: Router;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductsComponent, HttpClientTestingModule, RouterTestingModule  ],
      providers: [ProductsService, ToastService]

    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    productService = TestBed.inject(ProductsService);
    router = TestBed.inject(Router);
    toastService = TestBed.inject(ToastService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get products', () => {
    const spyService = spyOn(productService, 'getProducts').and.returnValue(of(responseProductsMock));
    component.getProducts();
    expect(spyService).toHaveBeenCalled();
  });

  it('should delete a productt', () => {
    const id = productsMock.id;
    const spyService = spyOn(productService, 'deleteProduct').and.returnValue(of(true));
    const spyToastService =  spyOn(toastService,'showToast').and.callThrough();
    component.handleDeleteProduct(id);
    expect(spyService).toHaveBeenCalled();
    expect(spyToastService).toHaveBeenCalled()
  });

  it('should go to create form product', () => {
    const spyService = spyOn(router, 'navigate');
    component.handleGoToAddProduct();
    expect(spyService).toHaveBeenCalled();
  });

  it('should go to edit form product', () => {
    const id = productsMock.id;
    const spyService = spyOn(router, 'navigate');
    component.handleGoToEditProduct(id);
    expect(spyService).toHaveBeenCalled();
  });

  it('should handle search', () => {
    const products = [productsMock];
    component.handleSearch(products);
    expect(component.products).toEqual(products);
  });

});
