import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { LoginService } from 'src/app/login/login.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { CartService } from '../cart/cart.service';
import { CategoryService } from '../category/category.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  public categories: Category[];
  public products: Product[];
  cartForm: FormGroup;

  constructor(private readonly homeService: HomeService,
    private readonly cartService: CartService,
    public userAuthService: UserAuthService,
    public loginService: LoginService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.cartForm = this.formBuilder.group({
      'user': ['', Validators.required],
      'product': ['', Validators.required],
      'quantity': [1]  
    });
      this.getCategories();
      this.getProducts();
  }

  isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public getCategories(): void {
    this.homeService.getRandomCategories().subscribe({
      next: (response: Category[]) => {
        this.categories = response;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    })
  }

  public getProducts(): void {
    this.homeService.getRandomProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }

  addToCart(): void {
    console.log(this.cartForm.value);
    this.cartService.addToCart(this.cartForm.value)
      .subscribe({
        next: () => {
          
          alert("Product added successfully");
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        }
      });
  }

  ngOnDestroy(): void {
      
  }

}
