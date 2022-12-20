import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getRandomProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/products`);
  }

  public getRandomCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/randomCategories`);
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/categories`);
  }

  public getSearchedProducts(productName): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/search`, {params: productName});
  }
}
