import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerProductComponent } from './customer-product.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', component: CustomerProductComponent}
];

@NgModule({
  declarations: [CustomerProductComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [
    CustomerProductComponent,
    RouterModule
  ]
})
export class CustomerProductModule { }
