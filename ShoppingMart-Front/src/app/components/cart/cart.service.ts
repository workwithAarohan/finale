import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { Cart } from 'src/app/interface/cart.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiServerUrl = environment.apiBaseUrl;

  count = new BehaviorSubject<number>(0);

  constructor(private readonly http: HttpClient) { }

  public addToCart(cart: Cart): Observable<Cart>
  {
    return this.http.post<Cart>(`${this.apiServerUrl}/cart/add`, cart);
  } 

  public getAllCartsByUserId(userId: number): Observable<Cart[]>
  {
    return this.http.get<Cart[]>(`${this.apiServerUrl}/cart/user/${userId}`);
  }

  public deleteCart(cartId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/cart/${cartId}`);
  }

  public getCartCount(userId: number): void {
    this.http.get<number>(`${this.apiServerUrl}/cart/count/${userId}`).pipe(first()).subscribe(count => this.count.next(count));
  }

  public setCartCount(count: number): void {
    localStorage.setItem("cart_count", JSON.stringify(count));
    this.count.next(count);
  }
}
