import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CategoryProductComponent } from './components/category-product/category-product.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("../app/components/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "admin/category",
    loadChildren: () => import('../app/components/category/category.module').then(m=> m.CategoryModule),
    canActivate:[AuthGuard], data:{role:['Admin']}
  },
  {
    path: "admin/product",
    loadChildren: () => import('../app/components/product/product.module').then(m=>m.ProductModule),
    canActivate:[AuthGuard], data:{role:['Admin']}
  },
  {
    path: "admin/dashboard",
    loadChildren: () => import('../app/dashboard/admin/admin.module').then(m=>m.AdminModule),
    canActivate:[AuthGuard], data:{role:['Admin']}
  },
  {
    path: "user/dashboard",
    loadChildren: () => import('../app/dashboard/user/user.module').then(m=>m.UserModule),
    canActivate:[AuthGuard], data:{role:['User']}
  },
  { 
    path: 'admin/products/:id', 
    component: CategoryProductComponent
  },
  {
    path: "product/details/:id", 
    component: ProductDetailsComponent
  },
  {
    path: "cart/:user_id",
    loadChildren: () => import('../app/components/cart/cart.module').then(m=>m.CartModule),
    canActivate:[AuthGuard], data:{role:['User']}
  },
  {
    path: "search",
    loadChildren: () => import('../app/customer/search/search.module').then(m=>m.SearchModule)
  },
  {
    path: "products/:id",
    loadChildren: () => import('../app/customer/customer-product/customer-product.module').then(m=>m.CustomerProductModule)
  },
  {
    path: "login",
    loadChildren: () => import('../app/login/login.module').then(m => m.LoginModule)
  },
  // {
  //   path: '/login',
  //   loadChildren: () => import('../app/security/security.module').then(m=>m.SecurityModule)
  // },
  {
    path: '**',
    loadChildren: () => import('../app/layout/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) 
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
