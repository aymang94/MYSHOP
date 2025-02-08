import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { GlobalService } from '../shared/services/global.service';
import { inject } from '@angular/core';

export class HeaderConfigInterceptor implements HttpInterceptor {
  private readonly globalService = inject(GlobalService);


  intercept(request: HttpRequest<unknown>,next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.globalService.showSpinner = true;
    
    return next
      .handle(request)
      .pipe(finalize(() => this.globalService.showSpinner = false));
  }
}
