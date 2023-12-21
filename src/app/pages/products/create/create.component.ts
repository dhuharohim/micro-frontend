import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudApiService } from 'src/app/services/crud-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  productForm!: FormGroup;
  showValidation: boolean = false;
  validations: any[] = [];
  formsArray = [
    {
      title: 'title',
      error_message: 'Product name is required',
    },
    {
      title: 'category',
      error_message: 'Category is required',
    },
    {
      title: 'price',
      error_message: 'Price is required',
    },
    {
      title: 'discountPercentage',
      error_message: 'Discount Percentage is required',
    },
    {
      title: 'rating',
      error_message: 'Rating is required',
    },
    {
      title: 'stock',
      error_message: 'Stock is required',
    },
    {
      title: 'brand',
      error_message: 'Brand is required',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: CrudApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    this.validations = [];
    if (!this.productForm.valid) {
      this.formsArray.forEach((form) => {
        if (this.productForm.controls[form.title].invalid) {
          this.validations.push(form.error_message);
        }
      });
      this.showValidation = true;
      return;
    }

    this.apiService.create('products', this.productForm.value).subscribe(
      (response) => {
        alert('Successfully created product!');
        this.router.navigate(['products']);
      },
      (error) => {
        alert(environment.default_error_message);
      },
      () => {
        this.showValidation = false;
      }
    );
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      discountPercentage: ['', Validators.min(0)],
      rating: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
    });
  }
}
