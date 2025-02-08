import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input } from '@angular/core';
import { Product } from '../../../../models/data-model.model';
import { ModalService } from '../../../../../../shared/services/modal.service';
import { AddEditProductComponent } from '../../modals/add-edit-product/add-edit-product.component';
import { ProductsService } from '../../services/products.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {

  private readonly destroyRef = inject(DestroyRef);

  @Input() products: Product[] = [];

  modalService = inject(ModalService);
  productsService = inject(ProductsService);
  alertService = inject(AlertService);
  dataService = inject(DataService);


  openEditProduct(product: Product) {
    this.modalService.openDialog(AddEditProductComponent, {
      editMode: true,
      product: product
    });
  }

  deleteProduct(product: Product) {

    this.alertService.alertConfirm('Are you sure?', 'Delete ' + product.title + '!').then(res => {
      if (res.isConfirmed) {
        this.productsService.deleteProduct(product.id).pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(res => {
            this.dataService.deleteProduct(product.id);
            this.alertService.alertOk('Product deleted successfully!');
          });
      }
    });

  }

  trackById(index: number, product: Product) {
    return product.id;
  }
}
