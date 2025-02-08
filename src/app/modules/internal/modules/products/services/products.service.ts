import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../../../../shared/services/http.service';
import { map, Observable } from 'rxjs';
import { Product } from '../../../models/data-model.model';
import { PRODUCTS_URL } from '../../../../../shared/constances/api.const';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  httpService = inject(HttpService);

  categoriesLOV = [
    {
      id: 1,
      value: "men's clothing"
    },
    {
      id: 2,
      value: "jewelery"
    },
    {
      id: 3,
      value: "electronics"
    },
    {
      id: 4,
      value: "women's clothing"
    }
  ];

  getProductsList(): Observable<Product[]> {
    return this.httpService.get(PRODUCTS_URL).pipe(map(res => {
      return res;
    }));
  }

  addProduct(body: Product) {
    return this.httpService.post(PRODUCTS_URL, body).pipe(map(res => {
      return res;
    }));
  }

  editProduct(body: Product) {
    return this.httpService.update(PRODUCTS_URL + '/' + body.id, body).pipe(map(res => {
      return res;
    }));
  }

  deleteProduct(id: number) {
    return this.httpService.delete(PRODUCTS_URL + id).pipe(map(res => {
      return res;
    }))
  }

  getcategoriesLOV() {
    return this.categoriesLOV;
  }

}
