import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, last } from 'rxjs';
import { CategoryService } from 'src/app/components/category/category.service';
import { ProductService } from 'src/app/components/product/product.service';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';

@Component({
  selector: 'app-customer-product',
  templateUrl: './customer-product.component.html',
  styleUrls: ['./customer-product.component.css']
})
export class CustomerProductComponent {

  categoryId: number;
  childCategories: Category[];
  products: Product[] = [];
  category: Category;

  constructor(private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.categoryId = +id;
    }

    this.categoryService.getCategoryById(this.categoryId);
    this.categoryService.category.subscribe({
      next: (response) => {
        this.category = response;
        console.log(this.category);
      }
    });



    setTimeout(() => {
      this.getChildCategories(this.categoryId);
    },1000);
  }

  getChildCategories(categoryId: number): void {

    this.categoryService.getChildCategories(categoryId);
    this.categoryService.categories.subscribe({
      next: (response) => {
        this.childCategories = response;
        // console.log(this.childCategories);
        this.childCategories.forEach((element) => {
          // console.log(element);
          setTimeout(() => {
            this.productService.getProductByCategory(element.id);

            this.productService.product.subscribe({
              next: (res) => {
                this.products = res;
                
              }
            });
          });
        });
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    })
  }

  getProductByCategory(childCategoryId: number): void {
    this.categoryService.getCategoryById(childCategoryId);
    this.categoryService.getChildCategories(childCategoryId);
    this.productService.getProductByCategory(childCategoryId);
       
    this.router.navigate(['/products', childCategoryId]).then();
  }

}
