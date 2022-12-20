import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from 'src/app/layout/dialog/dialog.component';
import { CategoryProductComponent } from '../category-product/category-product.component';

const routes: Routes = [
  { path: '', component: CategoryComponent },
  { path: 'products/:id', component: CategoryProductComponent}
];

@NgModule({
  declarations: [CategoryComponent, DialogComponent, CategoryProductComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CategoryComponent,
    RouterModule,
    DialogComponent,
    CategoryProductComponent
  ]
})
export class CategoryModule { }
