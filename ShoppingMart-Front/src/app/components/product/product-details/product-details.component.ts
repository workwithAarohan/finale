import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/product.interface';
import { LoginService } from 'src/app/login/login.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { CartService } from '../../cart/cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'] 
})
export class ProductDetailsComponent implements OnInit {
  cartForm: FormGroup;
  cartQuantity: number = 1;
  cartCount: number;

  productId: number;
  product: Product;

  constructor(private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly formBuilder: FormBuilder,
    private readonly cartService: CartService,
    public loginService: LoginService,
    public userAuthService: UserAuthService) {}

  ngOnInit(): void {
    this.cartForm = this.formBuilder.group({
      'user': ['', Validators.required],
      'product': ['', Validators.required],
      'quantity': ['', Validators.required]  
    });

    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.productId = +id;
    }

    this.getProductDetails();
  }

  getProductDetails(): void {
    this.productService.getProductById(this.productId)
      .subscribe({
        next: (response) => {
          this.product = response;
          console.log(this.product);
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        }
      })
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
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        }
      });
  }
}
