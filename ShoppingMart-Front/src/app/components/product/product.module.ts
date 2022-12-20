import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductDialogComponent } from 'src/app/layout/product-dialog/product-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path: '', component: ProductComponent},
  {path: 'details/:id', component: ProductDetailsComponent}
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductDialogComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports:
  [
    ProductComponent,
    RouterModule,
    ProductDialogComponent,
    ProductDetailsComponent
  ]
})
export class ProductModule { }
