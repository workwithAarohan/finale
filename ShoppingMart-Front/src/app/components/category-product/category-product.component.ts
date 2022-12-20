import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';
import { ProductDialogComponent } from 'src/app/layout/product-dialog/product-dialog.component';
import { CategoryService } from '../category/category.service';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css']
})
export class CategoryProductComponent implements OnInit {

  products: Product[];
  category_id: number;
  category: Category;

  displayedColumns: string[] = ['id', 'imageUrl', 'name', 'price', 'quantity', 'action'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private productDialog: MatDialog,
    private readonly router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.category_id = +id;
    }

    this.getProducts();

    this.categoryService.getCategoryById(this.category_id);
    this.categoryService.category.subscribe({
      next: (response) => {
        this.category = response;
      }
    })
  }

  getProducts(): void {
    this.productService.getProductByCategory(this.category_id);
    this.productService.product.subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    })
  }

  // Material Table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Dialog Box
  addProduct() {
    this.productDialog.open(ProductDialogComponent, {
      width: '70%'
    }).afterClosed().subscribe(val => {
      if(val == 'save') {
        console.log("help");
        this.getProducts();
      }
    });
  }

  editProduct(row): void {
    this.productDialog.open(ProductDialogComponent, {
      width: '70%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val == 'update') {
        this.getProducts();
      }
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id)
      .subscribe({
        next: () => {
          this.getProducts();
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        }
      })
  }

  goToItemDetails(data: Product): void {
    this.router.navigate(['/admin/product/details', data.id], {state: {data}}).then();
  }
}
