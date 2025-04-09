import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverhighlightDirective } from './directives/hoverhighlight.directive';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { PaginationComponent } from '../components/pagination/pagination.component';



@NgModule({
  declarations: [
    HoverhighlightDirective,
    GenericTableComponent,
    PaginationComponent,

  ],
  imports: [
    CommonModule
  ],
  exports:[
    HoverhighlightDirective,
    GenericTableComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
