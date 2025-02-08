import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ProductsService } from '../products/services/products.service';
import { DataService } from '../products/services/data.service';
import { Invoice, Product } from '../../models/data-model.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../../shared/services/global.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { InvoicesService } from './services/invoices.service';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent implements OnInit {

  private readonly destroyRef = inject(DestroyRef);
  productsService = inject(ProductsService);
  globalService = inject(GlobalService);
  modalService = inject(ModalService);
  invoicesService = inject(InvoicesService);
  alertService = inject(AlertService);
  dataService = inject(DataService); /* work around service, used to simulate UI changes, as '/products' API has static data*/

  products: Product[] = [];

  form = new FormGroup({
    userId: new FormControl(+this.globalService.userId, { validators: Validators.required }),
    date: new FormControl((new Date()).toLocaleDateString(), { validators: Validators.required }),
    products: new FormArray([], Validators.required)
  });

  ngOnInit(): void {
    this.getProductsList();
    this.addProduct();
    
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


  getProductsArray(formGroup: AbstractControl): FormArray {
    return formGroup.get('products') as FormArray;
  }

  addProduct() {
    (this.form.controls['products'] as any).push(
      new FormGroup({
        productId: new FormControl(null, Validators.required),
        quantity: new FormControl(null, Validators.required)
      })
    );
  }

  removeProduct(index: number) {
    (this.form.controls['products'] as any).removeAt(index);
  }


  submit() {
    this.alertService.alertConfirm('', 'Create new Invoice !').then(res => {
      if(res.isConfirmed) {
        let invoiceBody = this.form.getRawValue();
        this.createInvoice(invoiceBody);
      }
    });
  }

  createInvoice(invoice: Invoice) {
    this.invoicesService.createInvoice(invoice).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.modalService.closeAllDialogs();
        this.alertService.alertOk('Invoice Created Successfully');
        this.form.controls.products.clear();
        this.addProduct();
      });
  }

}
