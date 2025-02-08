import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  @Input() type = "text";
  @Input() placeholder = "";
  @Input() secondaryStyle = false;

  @Output() onChange = new EventEmitter<string>();

  inputCtrl = new FormControl<string>('', {
    nonNullable: true,
  });

  writeValue(value: string | number | any) {
    if (value) {
      this.inputCtrl.setValue(value);
    } else {
      this.inputCtrl.reset('');
    }
  }

  registerOnChange(fn: (value: string | null) => void) {
    this.inputCtrl.valueChanges.subscribe((res) => {
      fn(res);
      this.onChange.emit(res);
    });
    
  }

  registerOnTouched(onTouched: any) {
    
  }

  onBlur() {

  }

}
