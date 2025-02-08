import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, MatSelectModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true
    }
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent implements OnInit {

  @Input() label = '';
  @Input() options: any[] = [];
  @Input() identifier = 'id';
  @Input() value = 'value';

  @Output() onSelect = new EventEmitter();

  selectedValue = '';

  ngOnInit(): void {
  }

  onSelectChange(selected: any) {
    this.selectedValue = selected.value;
    this.onSelect.emit(selected);
  }

  

  selectListControl = new FormControl<string>('', {
    nonNullable: true,
  });

 
  writeValue(value: any): void {
    if (value != null) {
      this.selectListControl.setValue(value);
      this.selectedValue = value;
    } else {
      this.selectListControl.reset('');
    }
  }

  
  registerOnChange(fn: (value: string | null) => void) {
    this.selectListControl.valueChanges.subscribe((res) => {
      fn(res);
      this.onSelect.emit(res);
    });
  }

  registerOnTouched(fn: () => void) {
  }


  markAsTouched() {
    
  }

}
