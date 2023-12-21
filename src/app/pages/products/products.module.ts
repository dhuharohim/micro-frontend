import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    // CreateComponent,
    // ProductsComponent
    // EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class ProductsModule { }
