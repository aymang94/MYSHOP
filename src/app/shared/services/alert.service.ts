import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alertOk(title?:string, message?: string) {
    Swal.fire({
      icon: 'success',
      iconColor: '#F7D87C',
      title: title,
      text: message,
      timer: 3500,
      confirmButtonColor: '#1C274C',
      color: '#1C274C'
    });
  }
  alertError(title?:string, message?: string) {
    Swal.fire({
      icon: 'error',
      iconColor: '#DF1642',
      title: title,
      text: message,
      timer: 3500,
      confirmButtonColor: '#1C274C',
      color: '#545454'
    });
  }

  alertConfirm(title: string, subtitle:string) {  
    return Swal.fire({
      title: title? title : "Are you sure?",
      text: subtitle,
      icon: "warning",
      iconColor: '#F7D87C',
      showCancelButton: true,
      confirmButtonColor: "#1C274C",
      cancelButtonColor: "#a4a4a4",
      confirmButtonText: "Yes"
    });
  }

}
