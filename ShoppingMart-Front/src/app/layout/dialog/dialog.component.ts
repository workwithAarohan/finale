import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/components/category/category.service';
import { Category } from 'src/app/interface/category.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  categoryForm: FormGroup;
  public categories: Category[];
  categoryFile: File;

  imageUrl: string;

  isUpdate: boolean = false;


  actionBtn: string = "Save"
  actionLabel: string = "Add"

  constructor(private formBuilder: FormBuilder, 
    private readonly categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public editData, 
    private dialogRef: MatDialogRef<Category>) {}

  ngOnInit(): void {
      this.categoryForm = this.formBuilder.group({
        'title': ['', Validators.required],
        'id': [''],
        'parent_category_id': [''],
        'imageUrl': ['']
      });

      this.categoryService.getCategory().subscribe({
        next: (response) => {
          this.categories = response;
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        }
      }) 

      console.log(this.editData);

      if(this.editData) {
        this.actionBtn = "Update";
        this.actionLabel = "Update";
        this.isUpdate = true;
        this.categoryForm.controls['title'].setValue(this.editData.title);
        this.categoryForm.controls['id'].setValue(this.editData.id);
        this.categoryForm.controls['parent_category_id'].setValue(this.editData.parent_category_id);
        this.imageUrl = '/assets/images/category/' + this.editData.imageUrl;
      }
  }

  addCategory(): void {
    const category = this.categoryForm.value;
    const formData = new FormData();
    formData.append('category', JSON.stringify(category));
    formData.append('file', this.categoryFile);
    console.log(formData);
    if(!this.editData) {
      this.categoryService
        .addCategory(formData)
        .subscribe({
          next: () => {
            this.categoryForm.reset();
            this.dialogRef.close('save');
          },
          error: (err: HttpErrorResponse) => {
            alert(err.message);
          }
        });
    }
    else {
      this.updateCategory(formData);
    }
  }

  updateCategory(formData: FormData): void {
    this.categoryService
      .updateCategory(formData)
      .subscribe({
        next: () => {
          this.categoryForm.reset();
          this.dialogRef.close('update')
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
      console.log(file);
      this.categoryFile = file;
    }
  }
}
