import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/product.interface';
import { ProductDialogComponent } from 'src/app/layout/product-dialog/product-dialog.component';
import { environment } from 'src/environments/environment';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  products: Product[];

  displayedColumns: string[] = ['id', 'imageUrl', 'name', 'price', 'quantity', 'category', 'action'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private readonly productService: ProductService,
    private productDialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProduct().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });
    
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
    if(confirm("Do you want to delete!") == true)
    {
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
  }

  goToItemDetails(data: Product): void {
    this.router.navigate(['product/details', data.id], {state: {data}}).then();
  }

  
}
