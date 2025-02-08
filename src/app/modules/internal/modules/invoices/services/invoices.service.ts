import { inject, Injectable } from '@angular/core';
import { INVOICE_URL } from '../../../../../shared/constances/api.const';
import { HttpService } from '../../../../../shared/services/http.service';
import { Invoice } from '../../../models/data-model.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  
  httpService = inject(HttpService);


  createInvoice(body: Invoice) {
      return this.httpService.post(INVOICE_URL, body).pipe(map(res => {
        return res;
      }));
    }

}
