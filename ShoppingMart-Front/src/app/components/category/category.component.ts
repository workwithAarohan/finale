import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/interface/category.interface';
import { CategoryService } from 'src/app/components/category/category.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/layout/dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public categories: Category[];

  displayedColumns: string[] = ['id', 'imageUrl', 'title', 'parentCategory', 'action'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService: CategoryService,
    private dialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCategories();
  }
 
  public getCategories(): void {
    this.categoryService.getCategory().subscribe(
      (response: Category[]) => {
        // this.categories = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(this.dataSource.data[1);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '70%'
    }).afterClosed().subscribe(val => {
      if(val == 'save') {
        this.getCategories();
      }
    }); 
  } 
  
  editCategory(row) {
    this.dialog.open(DialogComponent ,{
      width: '70%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val == 'update') {
        this.getCategories();
      }
    });
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id)
      .subscribe({
        next: () => {
          this.getCategories();
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        }
      })
  }

  

  goToItemDetails(data: Category): void {
    this.router.navigate(['products', data.id], {state: {data}, relativeTo: this.route}).then();
  }



  // public onAddCategory(addForm: NgForm): void {
  //   console.log(addForm.value);
  //   this.categoryService
  //       .addCategory(addForm.value)
  //       .subscribe(
  //         (response: Category) => {
  //           console.log(response);
  //           this.getCategories();
  //         },
  //         (error: HttpErrorResponse) => {
  //           alert(error.message);
  //         }
  //       );
  // }


}
