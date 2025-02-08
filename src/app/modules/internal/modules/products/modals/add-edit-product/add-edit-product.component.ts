import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Inject, OnInit } from '@angular/core';
import { ModalComponent } from '../../../../../../shared/components/modal/modal.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownComponent } from '../../../../../../shared/components/dropdown/dropdown.component';
import { ProductsService } from '../../services/products.service';
import { InputComponent } from '../../../../../../shared/components/input/input.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalService } from '../../../../../../shared/services/modal.service';
import { DataService } from '../../services/data.service';
import { Product } from '../../../../models/data-model.model';
import { AlertService } from '../../../../../../shared/services/alert.service';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    ReactiveFormsModule,
    DropdownComponent,
    InputComponent
  ],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss'
})
export class AddEditProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  private readonly destroyRef = inject(DestroyRef);

  productService = inject(ProductsService);
  dataService = inject(DataService);
  modalService = inject(ModalService);
  alertService = inject(AlertService);

  editMode = false;
  categories: any = [];

  form = new FormGroup({
    category: new FormControl('', { validators: Validators.required, nonNullable: true }),
    title: new FormControl('', { validators: Validators.required, nonNullable: true }),
    description: new FormControl('', { validators: Validators.required, nonNullable: true }),
    price: new FormControl(null, { validators: Validators.required }),
    id: new FormControl(Math.ceil(Math.random() * 1000 / 10), { validators: Validators.required, nonNullable: true })
    // generating fake id, (BACKEND JOB)
  });



  ngOnInit(): void {
    this.categories = this.productService.getcategoriesLOV();
    this.editMode = this.data.editMode;

    if (this.editMode) {
      this.populateForm();
    }
  }

  populateForm() {
    let product = this.data.product;
    this.form.setValue({
      category: this.getCategoryId(product.category),
      title: product.title,
      description: product.description,
      price: product.price,
      id: product.id
    });
  }

  submit() {
    let product = this.form.getRawValue();
    if (this.editMode) {
      this.editProduct(product);
    }
    else {
      this.addProduct(product);
    }
  }

  closeModal() {
    this.modalService.closeAllDialogs();
  }

  addProduct(product: Product) {
    this.productService.addProduct(product).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.modalService.closeAllDialogs();
        this.dataService.products.unshift(product);
        this.alertService.alertOk('Product Added Successfully');
      });
  }

  editProduct(product: Product) {
    this.productService.editProduct(product).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.modalService.closeAllDialogs();
        this.dataService.editProduct(product);
        this.alertService.alertOk('Product Updated Successfully');
      });
  }



  getCategoryId(category: any) { /* category returned from API as string not Id */
    if (isNaN(category)) {
      let result = this.categories.filter((item: any) => {
        return item.value === category
      });
      return result[0].id;
    }
    return category;
  }


}
