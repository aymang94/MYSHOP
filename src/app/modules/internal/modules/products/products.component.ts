import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product } from '../../models/data-model.model';
import { DataService } from './services/data.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { AddEditProductComponent } from './modals/add-edit-product/add-edit-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  private readonly destroyRef = inject(DestroyRef);
  productsService = inject(ProductsService);
  modalService = inject(ModalService);
  dataService = inject(DataService); /* work around service, used to simulate UI changes, as '/products' API has static data*/


  products: Product[] = [];


  ngOnInit(): void {
    this.getProductsList();
  }



  getProductsList() { 
    if (this.dataService.products.length) {
      this.products = this.dataService.products;
    }
    else {
      this.productsService.getProductsList().pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(res => {
          this.dataService.products = res;
          this.products = this.dataService.products;
        });
    }
  }

  openAddProduct() {
    this.modalService.openDialog(AddEditProductComponent, {
      editMode: false
    });
  }


}
