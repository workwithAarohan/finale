import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiServerUrl = environment.apiBaseUrl; 

  products = new BehaviorSubject<Product[]>([]);

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  )

  constructor(private http: HttpClient) { }

  public getRandomProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/product/user/random`, {headers: this.requestHeader});
  }

  public getRandomCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/category/user/randomCategories`, {headers: this.requestHeader});
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/category/user/root`, {headers: this.requestHeader});
  }

  public getSearchedProducts(productName): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/search`, {params: productName});
  }

  public getAllChildProducts(categoryId: number): void {
    this.http.get<Product[]>(`${this.apiServerUrl}/product/user/childCategories/${categoryId}`, {headers: this.requestHeader})
    .pipe(first()).subscribe(product => this.products.next(product));
  }
}
