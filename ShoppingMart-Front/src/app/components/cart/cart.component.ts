import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/interface/cart.interface';
import { OrderDialogComponent } from 'src/app/layout/order-dialog/order-dialog.component';
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
  cartCount: number ;
  totalPrice: number;

  constructor(private readonly cartService: CartService, 
    private readonly route: ActivatedRoute,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('user_id');
    if(id)
    {
      this.userId = +id;
    }

    this.getCartByUserId(this.userId);

    setTimeout(() => {
      this.calCount();
    }, 100);

    
  }

  openDialog() {
    this.dialog.open(OrderDialogComponent, {
      width: '70%'
    }).afterClosed().subscribe(val => {
      if(val == 'save') {
        alert("ok")
      }
    }); 
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

  deleteCartItem(cartId): void {
    if (confirm("Do you want to delete!") == true) {
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
