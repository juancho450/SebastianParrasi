import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from "../header-bar/header-bar.component";
import { RouterModule } from '@angular/router';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [CommonModule, HeaderBarComponent, RouterModule, ToastComponent],
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent {

}
