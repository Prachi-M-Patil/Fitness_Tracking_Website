import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  standalone: false,
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent {
  @Input() columns: { field: string; header: string }[] = [];
  @Input() data: any[] = [];
  @Input() actions!: any; // Accept a template reference for actions
}

