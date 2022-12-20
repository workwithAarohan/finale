import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/components/category/category.service';
import { ProductService } from 'src/app/components/product/product.service';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';

@Component({
  selector: 'app-product-dialog', 
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  productForm: FormGroup;

  actionBtn: string = "Save"
  actionLabel: string = "Add"
  categories: Category[];

  productFile: File;

  imageUrl: string;

  constructor(private readonly formBuilder: FormBuilder, 
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private productDialogRef: MatDialogRef<Product>,
    @Inject(MAT_DIALOG_DATA) public editData) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      'id': [''],
      'name': ['', Validators.required],
      'price': ['', Validators.required],
      'quantity': ['', Validators.required],
      'imageUrl': [''],
      'description': ['', Validators.required],
      'category_id': ['', Validators.required],
    });

    this.categoryService.getCategory().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    });

    console.log(this.editData);

    if(this.editData) {
      this.actionBtn = "Update";
      this.actionLabel = "Update";
      this.productForm.controls['id'].setValue(this.editData.id);
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['quantity'].setValue(this.editData.quantity);
      this.productForm.controls['description'].setValue(this.editData.description);
      // this.productForm.controls['imageUrl'].setValue(this.editData.imageUrl);
      this.productForm.controls['category_id'].setValue(this.editData.category_id?.id);
    }
  }

  addProduct(): void {
    const product = this.productForm.value;
    const formData = new FormData();
    formData.append('product', JSON.stringify(product));
    formData.append('file', this.productFile);
    if(!this.editData){
      this.productService
        .addProduct(formData)
        .subscribe({
          next: () => {
            this.productForm.reset();
            this.productDialogRef.close("save");
          },
        error: (err: HttpErrorResponse) => {
            alert(err.message);
          }
      })
    }
    else {
      this.updateProduct(formData); 
    }
  }

  updateProduct(formData: FormData): void {
    this.productService
    .updateProduct(formData)
    .subscribe({
      next: () => {
        this.productForm.reset();
        this.productDialogRef.close("update");
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    })
  }

  onSelectFile(e) {
    if(e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      }

      const file = e.target.files[0];
      this.productFile = file;
    }
  }
}
