import { Component } from '@angular/core';
import { CrudApiService } from 'src/app/services/crud-api.service';
import { environment } from 'src/environments/environment';

interface Products {
  id: number;
  title: string;
  category: string;
  brand: string;
  rating: number;
  stock: number;
  price: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  public products: Products[] = [];
  isLoading: boolean = false;
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;

  constructor(private apiService: CrudApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.isLoading = true;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.apiService
      .getAllWithPagination('products', this.currentPage, this.pageSize)
      .subscribe(
        (response) => {
          this.products = response.data;
          this.totalItems = this.products.length;
          this.products = this.products.slice(startIndex, startIndex + this.pageSize);
        },
        (error) => {
          alert(environment.default_error_message);
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.getData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getData();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  deleteProduct(productId: number): void {
    if(!confirm('Are you sure you want to delete this product?')) {
      return
    }
    
    this.apiService.delete('products', productId).subscribe((response) => {
      alert('Product deleted successfully');
      this.getData();
    },
    (error) => {
      alert(environment.default_error_message);
    }
    )
  }
}
