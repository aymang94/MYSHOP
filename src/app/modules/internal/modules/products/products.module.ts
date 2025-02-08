import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ProductsListComponent,
    MatDialogModule,
    DropdownComponent
  ]
})
export class ProductsModule { }
