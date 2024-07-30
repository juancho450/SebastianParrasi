import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() disabled: boolean;
  @Input() buttonClass: string;
  @Input() label: string;
  @Output() handleClickEvent: EventEmitter<Event> = new EventEmitter();

  handleClick(){
    this.handleClickEvent.emit();
  }
}
