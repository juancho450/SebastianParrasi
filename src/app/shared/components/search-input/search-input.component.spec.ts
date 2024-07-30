import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SearchInputComponent } from './search-input.component';
import { productsMock } from 'mocks/products.mock';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SearchInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    component.data = [productsMock];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter data when control value changes', fakeAsync(() => {
    const spy = spyOn(component.handleSearchData, 'emit');

    component.searchControl.setValue('mock test');
    component.searchControl.updateValueAndValidity({ emitEvent: true});

    tick(500);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  }));
});
