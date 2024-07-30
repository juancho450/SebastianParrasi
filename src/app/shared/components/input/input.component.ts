import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() type!: string;
  @Input() placeholder: string = '';
  @Input() disabled!: boolean;
  @Input() label!: string;
  @Input() control: FormControl;
  @Input() maxLength: number;
  @Input() minLength: number;
  @Input() min: string;
  @Output() handleChangeEvent: EventEmitter<Event> = new EventEmitter();
  @Output() handleInputEvent: EventEmitter<Event> = new EventEmitter();

  constructor() {
    this.control = new FormControl();
  }

  handleInput(event: Event) {
    this.handleInputEvent.emit(event);
  }

  handleChange(event: Event) {
    this.handleChangeEvent.emit(event);
  }
}
