import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/interface/cart.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiServerUrl = environment.apiBaseUrl;

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
}
