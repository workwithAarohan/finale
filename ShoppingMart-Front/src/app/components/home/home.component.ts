import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { CategoryService } from '../category/category.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  public categories: Category[];
  public products: Product[];

  constructor(private readonly homeService: HomeService,
    private readonly categoryService: CategoryService) {}

  ngOnInit(): void {
      this.getCategories();
      this.getProducts();
  }

  public getCategories(): void {
    this.homeService.getRandomCategories().subscribe({
      next: (response: Category[]) => {
        this.categories = response;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    })
  }

  public getProducts(): void {
    this.homeService.getRandomProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
  }

  ngOnDestroy(): void {
      
  }

}
