import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ InputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event input', () => {
    const spy = spyOn(component.handleInputEvent, 'emit');
    const event =  new Event('');
    component.handleInput(event);

    expect(spy).toHaveBeenCalled();
  });

  it('should emit event change', () => {
    const spy = spyOn(component.handleChangeEvent, 'emit');
    const event =  new Event('');
    component.handleChange(event);

    expect(spy).toHaveBeenCalled();
  });
});
