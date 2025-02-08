import { Injectable } from '@angular/core';
import { Product } from '../../../models/data-model.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /*     Work around
      Using this data.service to cache productList Here to simulate UI changes on list,
      as getProducts API returns same static data & the CRUD operation (add & edit & delete)
      will not affect products list.
      (static array added in 'https://fakestoreapi.com/products') 

      Note: all APIs are implemented & executed successfully with status 200
   */
  
      
      products: Product[] = [];


      editProduct(product: Product) {
        for(let i=0; i< this.products.length; i++) {
          if(this.products[i].id === product.id) {
            this.products[i] = Object.assign({}, this.products[i], product);
            return;
          }
        }
      }

      deleteProduct(id: number) {
        for(let i=0; i< this.products.length; i++) {
          if(this.products[i].id === id) {
            this.products.splice(i, 1);
            return;
          }
        }
      }

}
