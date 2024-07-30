import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './core/components/base-layout/base-layout.component';
import { ProductResolver } from './shared/resolver/product.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children:[
      {
        path: 'products',
        loadComponent: () =>
          import('./feature/components/products/products.component').then((m) => m.ProductsComponent),
      },
      {
        path: 'product-form',
        loadComponent: () =>
          import('./feature/components/products-form/products-form.component').then((m) => m.ProductsFormComponent),
        resolve: { data: ProductResolver } 
      },
      {
        path: 'product-form/:id',
        loadComponent: () =>
          import('./feature/components/products-form/products-form.component').then((m) => m.ProductsFormComponent),
          resolve: { data: ProductResolver } 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
