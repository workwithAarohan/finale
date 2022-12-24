import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { LoginService } from 'src/app/login/login.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { CartService } from '../cart/cart.service';
import { CategoryService } from '../category/category.service';
import { HomeService } from '../home/home.service';
import {ProductService} from '../product/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{

  public categories: Category[];
  searchForm: FormGroup;
  userId: number = 22;
  public products: Product[];
  cartCount: number;

  childCategories: Category[];

  constructor(private readonly homeService: HomeService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService, 
    private readonly cartService: CartService,
    public userAuthService: UserAuthService,
    public loginService: LoginService) {
      this.cartService.count.subscribe({
        next: response => {
          this.cartCount = response;
        }
      })
    }


  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      'productName': ['', Validators.required] 
    });

    this.getCategories();

    const userId = this.route.snapshot.paramMap.get("id");
    if(userId) {
      this.userId = 22;
    }

    // setTimeout(()=> {
    //   // this.cartService.getCartCount();
    //   this.cartService.count.subscribe({
    //     next: response => {
    //       this.cartCount = response;
    //     }
    //   })
    // }, 100);

  }

  isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

  getProductByCategory(categoryId: number): void {
    this.categoryService.getCategoryById(categoryId);
    this.categoryService.getChildCategories(categoryId);
    this.homeService.getAllChildProducts(categoryId);
       
    this.router.navigate(['/products', categoryId]).then();
  }

  public getCategories(): void {
    this.homeService.getCategories().subscribe({
      next: (response: Category[]) => {
        this.categories = response;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    })
  }

  searchProduct(): void {

    this.homeService.getSearchedProducts(this.searchForm.value).subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    })

    setTimeout(() => {
      this.navigateToSearch(this.products);
    }, 1000);
  }

  navigateToSearch(data: Product[]) {
    this.router.navigate(['search'], {state: {data}}).then();
  }

  

}
