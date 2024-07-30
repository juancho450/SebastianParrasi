import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ProductsFormComponent } from './products-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { Response } from 'src/app/shared/interfaces/response.interface';
import { productsMock } from 'mocks/products.mock';

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;
  let productService: ProductsService;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsFormComponent, HttpClientTestingModule, RouterTestingModule,],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 'testId',
              },

            },
            data: of({ data: productsMock })
          }
        },
        ProductsService,
        ToastService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsFormComponent);
    productService = TestBed.inject(ProductsService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form', () => {
    const spy = spyOn(component.productFormGroup, 'reset');

    component.handleReset();

    expect(spy).toHaveBeenCalled();
  });

  it('should update product', () => {
    const spy = spyOn(productService, 'updateProduct').and.returnValue(of({} as Response<Product>));
    const routerSpy = spyOn(router, 'navigate');


    component.handleSend();

    expect(spy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/products']);
  });

  it('should update product and return error', () => {
    const spy = spyOn(productService, 'updateProduct').and.returnValue(throwError(()=> new Error('404')));

    component.handleSend();

    expect(spy).toHaveBeenCalled();

  });

  it('should save product', () => {
    const spy = spyOn(productService, 'saveProduct').and.returnValue(of({} as Response<Product>));
    const routerSpy = spyOn(router, 'navigate');


    component.handleSaveProduct(productsMock);

    expect(spy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/products']);
  });

  it('should save product and return error', () => {
    const spy = spyOn(productService, 'saveProduct').and.returnValue(throwError(()=> new Error('404')));
  
    component.handleSaveProduct(productsMock);

    expect(spy).toHaveBeenCalled();
  });

  it('should verify id when control value changes', fakeAsync(() => {
    const spyService = spyOn(productService, 'verifyProductId').and.returnValue(of(true));

    component.idControl.updateValueAndValidity({ emitEvent: true});

    tick(500);
    fixture.detectChanges();

    expect(spyService).toHaveBeenCalled();
    expect(component.isDuplicateID).toBeTruthy();
  }));


});
