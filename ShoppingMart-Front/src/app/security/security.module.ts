import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityComponent } from './security.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: SecurityComponent}
];

@NgModule({
  declarations: [SecurityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    SecurityComponent
  ]
})
export class SecurityModule { }
