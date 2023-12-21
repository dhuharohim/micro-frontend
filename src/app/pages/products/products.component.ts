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
    this.apiService
      .getAllWithPagination('products', this.currentPage, this.pageSize)
      .subscribe(
        (response) => {
          this.products = response.data;
          this.totalItems = response.totalItems;
        },
        (error) => {
          alert(environment.default_error_message);
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
}
