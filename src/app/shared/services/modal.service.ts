import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  dialog = inject(MatDialog);

  openDialog(componentName: any, data?: any, width?: string, maxHeight?: string) {
    this.dialog.closeAll();
    this.dialog.open(componentName, {
      disableClose: false,
      data: data,
      width: width ? width : '500px',
      maxHeight: maxHeight ? maxHeight : '700px'
    });
  }

  closeAllDialogs() {
    this.dialog.closeAll();
  }

}
