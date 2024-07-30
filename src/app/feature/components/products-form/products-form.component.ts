import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { TOAST_STATE } from 'src/app/shared/constants/toast';
import * as moment from 'moment';
import { debounceTime, filter, switchMap } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [CommonModule, InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss']
})
export class ProductsFormComponent implements OnInit {

  public productFormGroup: FormGroup;
  public currentDate: string;
  public isDuplicateID: boolean;
  public productId: string

  constructor(private fb: FormBuilder, private productsService: ProductsService, private router: Router, private toast: ToastService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.createProductForm();
    this.currentDate = new Date().toISOString().slice(0, 10);
    this.productId = this.activatedRoute.snapshot.params['id'];

    this.activatedRoute.data.subscribe(data => {
      if (data['data']) {
        this.setProductForm(data['data']);
      }
    });

    this.idControl.valueChanges.pipe(
      debounceTime(500),
      filter(query => query && this.idControl.valid),
      switchMap(query => this.productsService.verifyProductId(query))
    ).subscribe(
      {
        next: (response) => {
          this.isDuplicateID = response;
        }
      }
    );
  }

  get idControl(): FormControl {
    return this.productFormGroup?.get('id') as FormControl;
  }

  get nameControl(): FormControl {
    return this.productFormGroup?.get('name') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.productFormGroup?.get('description') as FormControl;
  }

  get logoControl(): FormControl {
    return this.productFormGroup?.get('logo') as FormControl;
  }

  get releaseDateControl(): FormControl {
    return this.productFormGroup?.get('date_release') as FormControl;
  }

  get reviewDateControl(): FormControl {
    return this.productFormGroup?.get('date_revision') as FormControl;
  }

  setProductForm(product: Product) {
    this.productFormGroup.patchValue(product);
    this.idControl.disable({onlySelf: true});
    this.isDuplicateID = false;
  }

  handleReset() {
    this.productFormGroup.reset({
      id: this.productId
    });
    
  }

  handleSend() {
    if (!this.productFormGroup.valid) {
      return;
    }

    const data = this.productFormGroup.getRawValue();

    if (this.productId) {
      this.handleUpdateProduct(data);
    } else {
      this.handleSaveProduct(data);
    }
  }

  handleUpdateProduct(product: Product) {
    this.productsService.updateProduct(product).subscribe({
      next: () => {
        this.router.navigate(['/products']);
        this.handleToast(TOAST_STATE.success, 'Producto actualizado exitosamente!!');
      },
      error: () => {
        this.handleToast(TOAST_STATE.danger, 'Ha ocurrido un error, intenta de nuevo');
      }
    });
  }

  handleSaveProduct(product: Product) {
    this.productsService.saveProduct(product).subscribe({
      next: () => {
        this.router.navigate(['/products']);
        this.handleToast(TOAST_STATE.success, 'Producto agregado exitosamente!!');
      },
      error: () => {
        this.handleToast(TOAST_STATE.danger, 'Ha ocurrido un error, intenta de nuevo');
      }
    });
  }

  handleChangeDate() {
    const releaseDate = moment(this.releaseDateControl.value);
    const reviewDate = releaseDate.add(1, 'year').format('YYYY-MM-DD');
    this.reviewDateControl.setValue(reviewDate);
  }

  private handleToast(status: string, message: string) {
    this.toast.showToast(
      status,
      message
    );
  }

  handleValidationReleaseDate(control: AbstractControl) {
    const currentDate = moment()
    const releaseDate = moment(control.value, 'YYYY-MM-DD');

    if (releaseDate.isBefore(currentDate, 'day'))
      return { "errorReleaseDate": true };

    return null;
  }

  private createProductForm() {
    this.productFormGroup = this.fb.group({
      id: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: [null, [Validators.required]],
      date_release: [null, [Validators.required, this.handleValidationReleaseDate]],
      date_revision: [{ value: null, disabled: true }, [Validators.required]],
    })
  }
}
