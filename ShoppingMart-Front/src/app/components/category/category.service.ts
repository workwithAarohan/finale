import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../../interface/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiServerUrl = environment.apiBaseUrl;

  category = new BehaviorSubject<Category>(null);

  categories = new BehaviorSubject<Category[]>([]);


  constructor(private http: HttpClient) { }

  public getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/category`);
  }

  // public getCategoryById(categoryId: number): Observable<Category> {
  //   return this.http.get<Category>(`${this.apiServerUrl}/category/find/${categoryId}`);
  // }

  public getCategoryById(categoryId: number): void {
    this.http.get<Category>(`${this.apiServerUrl}/category/find/${categoryId}`)
      .subscribe(category => this.category.next(category));

  }

  public getChildCategories(categoryId: number): void {
    this.http.get<Category[]>(`${this.apiServerUrl}/category/childCategories/${categoryId}`)
      .subscribe(categories => this.categories.next(categories));
  }



  public addCategory(formData: FormData): Observable<FormData>
  {
    return this.http.post<FormData>(`${this.apiServerUrl}/category/add`, formData);
  }

  public updateCategory(formData: FormData): Observable<FormData>
  {
    return this.http.put<FormData>(`${this.apiServerUrl}/category/update`, formData);
  }

  public deleteCategory(categoryId: number): Observable<void> 
  {
    return this.http.delete<void>(`${this.apiServerUrl}/category/delete/${categoryId}`);
  }
   
}
