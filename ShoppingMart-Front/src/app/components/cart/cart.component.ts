import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/interface/cart.interface';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  userId: number;
  cartItems: Cart[];
  cartCounterItems: Cart[];
  cartCount: number = 0;

  constructor(private readonly cartService: CartService, 
    private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('user_id');
    if(id)
    {
      this.userId = +id;
    }

    this.getCartByUserId(this.userId);

    setTimeout(() => {
      this.calCount();
    }, 1000);

    
  }

  getCartByUserId(userId): void {
    this.cartService.getAllCartsByUserId(userId)
      .subscribe({
        next: (response) => {
          this.cartItems = response;
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        } 
      });
  }

  deleteCartItem(cartId): void {
    this.cartService
      .deleteCart(cartId).subscribe({
        next: () => {
          this.getCartByUserId(this.userId);
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        }
      });
  }

  calCount(): void {
    this.cartItems.map((cartItem) => {
      this.cartCount += cartItem.quantity;
    });
  }
}
