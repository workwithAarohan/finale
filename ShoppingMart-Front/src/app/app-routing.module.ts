import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("../app/components/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "admin/category",
    loadChildren: () => import('../app/components/category/category.module').then(m=> m.CategoryModule)
  },
  {
    path: "admin/product",
    loadChildren: () => import('../app/components/product/product.module').then(m=>m.ProductModule)
  },
  {
    path: "cart/:user_id",
    loadChildren: () => import('../app/components/cart/cart.module').then(m=>m.CartModule)
  },
  {
    path: "search",
    loadChildren: () => import('../app/customer/search/search.module').then(m=>m.SearchModule)
  },
  {
    path: "products/:id",
    loadChildren: () => import('../app/customer/customer-product/customer-product.module').then(m=>m.CustomerProductModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
