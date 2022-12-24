import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { OrderDialogComponent } from 'src/app/layout/order-dialog/order-dialog.component';

const routes: Routes = [
  {path: '', component: CartComponent}
]

@NgModule({
  declarations: [CartComponent, OrderDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CartComponent,
    RouterModule,
    OrderDialogComponent
  ]
})
export class CartModule { }
