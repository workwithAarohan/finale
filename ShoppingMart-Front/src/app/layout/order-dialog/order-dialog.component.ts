import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/components/cart/cart.service';
import { Cart } from 'src/app/interface/cart.interface';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent {
  userId: number;
  cartItems: Cart[];
  cartCount: number ;
  totalPrice: number;

  constructor(private readonly cartService: CartService,
    private readonly route: ActivatedRoute,
    private readonly userAuthService: UserAuthService) {}

  ngOnInit() {

    this.getCartByUserId(+this.userAuthService.getUserId());

    setTimeout(() => {
      this.calCount();
    }, 100);
  }

  getCartByUserId(userId): void {
    this.cartService.getAllCartsByUserId(userId)
      .subscribe({
        next: (response) => {
          this.cartItems = response;
          setTimeout(() => {
            this.calCount();
          }, 100);
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        } 
      });
  }

  calCount(): void {
    this.totalPrice = 0;
    this.cartCount = 0;
    this.cartItems.map((cartItem) => {
      this.cartCount += cartItem.quantity;
      this.totalPrice += cartItem.product.price * this.cartCount;
    });
  }

}
