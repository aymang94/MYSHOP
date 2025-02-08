import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() header = '';
  @Output() onClose = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<ModalComponent>) { }

  ngOnInit() {

  }

  close() {
    this.dialogRef.close();
    this.onClose.emit();
  }


}
