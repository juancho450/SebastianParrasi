import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  public searchControl: FormControl = new FormControl('');

  @Input() data: unknown & Product[];
  @Output() handleSearchData: EventEmitter<unknown[]> = new EventEmitter();

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),    
    ).subscribe(
      {
        next: (query) => {
          if(query){
            this.handleSearchData.emit(this.filterData(query))
          }else{
            this.handleSearchData.emit(this.data);
          } 
        }
      }
    );
  }

  private filterData(query: string): any[] {
    return this.data.filter(item => item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')));
  }
}
