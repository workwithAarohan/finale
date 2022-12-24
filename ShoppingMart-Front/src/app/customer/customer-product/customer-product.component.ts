import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, last } from 'rxjs';
import { CartService } from 'src/app/components/cart/cart.service';
import { CategoryService } from 'src/app/components/category/category.service';
import { HomeService } from 'src/app/components/home/home.service';
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
  cartForm: FormGroup;
  cartCount: number;

  constructor(private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly router: Router,
    private readonly homeService: HomeService,
    private formBuilder: FormBuilder,
    private cartService: CartService) {}

  ngOnInit(): void {

    this.cartForm = this.formBuilder.group({
      'user': ['', Validators.required],
      'product': ['', Validators.required],
      'quantity': [1]  
    });

    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.categoryId = +id;
    }

    console.log(this.categoryId);

    this.categoryService.getCategoryById(this.categoryId);
    this.categoryService.category.subscribe({
      next: (response) => {
        this.category = response;
        console.log(this.category);
      }
    });
    setTimeout(() => {

      this.getChildCategories(this.categoryId);
    },100);
  }

  getChildCategories(categoryId: number): void {

    this.categoryService.getChildCategories(categoryId);
    this.categoryService.categories.subscribe({
      next: (response) => {
        this.childCategories = response;
        // console.log(this.childCategories);
        // this.childCategories.forEach((element) => {
        //   // console.log(element);
        //   setTimeout(() => {
        //     this.productService.getProductByCategory(element.id);

        //     this.productService.product.subscribe({
        //       next: (res) => {
        //         this.products = res;
                
        //       }
        //     });
        //   });
        // });
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
    this.homeService.getAllChildProducts(categoryId);
    this.homeService.products.subscribe({
      next: (response) => {
        this.products = response;
        console.log(this.products);
      }
    })
  }

  getProductByCategory(childCategoryId: number): void {
    this.categoryService.getCategoryById(childCategoryId);
    this.categoryService.getChildCategories(childCategoryId);
    this.homeService.getAllChildProducts(childCategoryId);
       
    this.router.navigate(['/products', childCategoryId]).then();
  }

  addToCart(): void {
    console.log(this.cartForm.value);
    this.cartService.addToCart(this.cartForm.value)
      .subscribe({
        next: () => {
          this.cartService.getAllCartsByUserId(22)
          .subscribe({
            next: (response) => {
              response.map((cartItem) => {
                this.cartCount += cartItem.quantity;
                this.cartService.setCartCount(this.cartCount);
              });
            },
            error: (err: HttpErrorResponse) => {
              alert(err.message);
            } 
          });
          alert("Product added successfully");
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        }
      });
  }

}
