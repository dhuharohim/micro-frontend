import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudApiService } from 'src/app/services/crud-api.service';
import { environment } from 'src/environments/environment';

interface Product {
  title: string;
  brand: string;
  category: string;
  discountPercentage: number;
  price: number;
  rating: number;
  stock: number;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  productId: string = '';
  product: Product = {
    title: '',
    brand: '',
    category: '',
    discountPercentage: 0,
    price: 0,
    rating: 0,
    stock: 0,
  };
  productForm!: FormGroup;
  isLoading: boolean = false;
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
  showValidation: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: CrudApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.productId = idParam;
      this.getProduct();
    }
  }

  getProduct(): void {
    this.isLoading = true;
    this.apiService.getOne('products', this.productId).subscribe(
      (response) => {
        this.product = response.data;
       this.initializeForm();
      },
      (error) => {
        alert(environment.default_error_message);
      },
      () => {
        this.isLoading = false;
      }
    );
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

    this.apiService.update('products', this.productId, this.productForm.value).subscribe(
      (response) => {
        alert('Successfully update this product!');
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
      title: [this.product.title, Validators.required],
      category: [this.product.category, Validators.required],
      price: [this.product.price, [Validators.required, Validators.min(0)]],
      discountPercentage: [
        this.product.discountPercentage,
        Validators.min(0),
      ],
      rating: [
        this.product.rating,
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
      stock: [this.product.stock, [Validators.required, Validators.min(0)]],
      brand: [this.product.brand, Validators.required],
    });
  }
}
