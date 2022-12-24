import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { Product } from 'src/app/interface/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
}) 
export class ProductService {

  private apiServerUrl = environment.apiBaseUrl;

  product = new BehaviorSubject<Product[]>([]);

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  )

  constructor(private readonly http: HttpClient) { }

  public getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/product`);
  }

  // public getProductByCategory(categoryId: number): Observable<Product[]>
  // {
  //   return this.http.get<Product[]>(`${this.apiServerUrl}/product/${categoryId}`);
  // }

  public getProductByCategory(categoryId: number): void
  {
      this.http.get<Product[]>(`${this.apiServerUrl}/product/${categoryId}`, {headers: this.requestHeader})
      .pipe(first()).subscribe(product => this.product.next(product));

  }
  public getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiServerUrl}/product/find/${productId}`, {headers: this.requestHeader});
  }

  // public getProductById(productId: number): void {
  //   this.http.get<Product>(`${this.apiServerUrl}/product/find/${productId}`)
  //   .subscribe(products => this.products.next(products));
  // }

  public addProduct(formData: FormData): Observable<FormData>
  {
    return this.http.post<FormData>(`${this.apiServerUrl}/product`, formData);
  }

  public updateProduct(formData: FormData): Observable<FormData>
  {
    return this.http.put<FormData>(`${this.apiServerUrl}/product`, formData);
  }

  public deleteProduct(productId: number): Observable<void> 
  {
    return this.http.delete<void>(`${this.apiServerUrl}/product/${productId}`);
  }
}
