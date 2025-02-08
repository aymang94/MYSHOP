import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../constances/api.const';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  http = inject(HttpClient);
  

  get(url: string, param?: any): Observable<any> {
    return this.http.get(BASE_URL + url, { params: param })
  }
  
  post(url: string, body: any, param?: any): Observable<any> {
    return this.http.post(BASE_URL + url, body,{ params: param})
  }
  
  update(url: string, body: any,param?:any): Observable<any> {
    return this.http.put(BASE_URL + url, body,{params:param})
  }
  
  patch(url: string, body: any,param?:any): Observable<any> {
    return this.http.patch(BASE_URL + url, body,{params:param})
  }
  
  delete(url: string, param?:any): Observable<any> {
    return this.http.delete(BASE_URL + url,{params:param})
  }
}
