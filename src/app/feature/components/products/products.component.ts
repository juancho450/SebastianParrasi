import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from 'src/app/shared/components/search-input/search-input.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { Columns } from 'src/app/shared/interfaces/columns.interface';
import { COLUMNS } from 'src/app/shared/constants/columns';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { TOAST_STATE } from 'src/app/shared/constants/toast';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, SearchInputComponent, TableComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public columns: Columns[] = [];
  public products: Product[];
  public filteredProducts: Product[];
  
  constructor(private productService: ProductsService, private router: Router, private toast: ToastService){ }

  ngOnInit(){
    this.columns = COLUMNS;
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next:(response)=>{
        this.products = response.data;
        this.filteredProducts = response.data;
      }
    })
  }

  handleGoToAddProduct(){
    this.router.navigate(['/product-form']);
  }

  handleSearch(value:unknown[]){
    this.products = value as Product[];
  }

  handleGoToEditProduct(id: string){
   this.router.navigate([`/product-form/${id}`]);
  }

  handleDeleteProduct(id: string){
    this.productService.deleteProduct(id).subscribe({
      next:()=>{
        this.toast.showToast(
          TOAST_STATE.success,
          'Producto eliminado exitosamente!'
        );
        this.getProducts();
      }
    })
  }
}
