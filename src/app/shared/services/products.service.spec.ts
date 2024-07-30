import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.local';
import { productsMock, responseProductsMock, responseSaveProductsMock } from 'mocks/products.mock';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  let url: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    url = environment['API_URL'];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {

    service.getProducts().subscribe((response)=>{
      expect(response).toEqual(responseProductsMock);
    });

    const req = httpMock.expectOne(`${url}/bp/products`);
    expect(req.request.method).toBe('GET');
    
  });

  it('should save products', () => {
    const data = productsMock;
    service.saveProduct(data).subscribe((response)=>{
      expect(response).toEqual(responseSaveProductsMock);
    });

    const req = httpMock.expectOne(`${url}/bp/products`);
    expect(req.request.method).toBe('POST');
    
  });

  it('should update products', () => {
    const data = productsMock;
    service.updateProduct(data).subscribe((response)=>{
      expect(response).toEqual(responseSaveProductsMock);
    });

    const req = httpMock.expectOne(`${url}/bp/products/${data.id}`);
    expect(req.request.method).toBe('PUT');
    
  });

  it('should delete products', () => {
    const id = productsMock.id;
    service.deleteProduct(id).subscribe((response)=>{
      expect(response).toEqual(true);
    });

    const req = httpMock.expectOne(`${url}/bp/products/${id}`);
    expect(req.request.method).toBe('DELETE');
    
  });

  it('should verify product id', () => {
    const id = productsMock.id;
    service.verifyProductId(id).subscribe((response)=>{
      expect(response).toEqual(true);
    });

    const req = httpMock.expectOne(`${url}/bp/products/verification/${id}`);
    expect(req.request.method).toBe('GET');
    
  });

});
