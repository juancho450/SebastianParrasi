import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Columns } from '../../interfaces/columns.interface';
import { FormsModule } from '@angular/forms';
import { NumberRecord } from '../../interfaces/records.interface';
import { NUMBER_RECORDS } from '../../constants/records';
import { Product } from '../../interfaces/product.interface';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() columns: Columns[] = [];
  @Input() data: unknown[] & Product[] = [];
  @Output() handleUpdateEvent: EventEmitter<string> = new EventEmitter();
  @Output() handleDeleteEvent: EventEmitter<string> = new EventEmitter();
  public numberRecords: NumberRecord[] = [];
  public selectedNumberRecord: number = 5;
  public showMenuAction: boolean;
  public rowSelected: unknown | Product;

  @HostListener('window:click', ['$event'])
  ClickEvent(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.matches('.dots')) {
      const myDropdown = document.getElementById('menu');
      if (myDropdown) {
        this.showMenuAction = false;
      }
    }
  }

  constructor(private cdref: ChangeDetectorRef) {

  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.numberRecords = NUMBER_RECORDS;
  }

  public handleNumberRecords() {

  }

  setRowData(data: unknown & Product, field: string) {
    return data[field as keyof typeof data]
  }

  handleUpdate(id: string) {
    this.handleUpdateEvent.emit(id);
  }

  handleDelete(id: string) {
    this.handleDeleteEvent.emit(id);
  }

  handleShowMenuActions(item: unknown) {
    this.rowSelected = item;
    this.showMenuAction = !this.showMenuAction;
  }

}
