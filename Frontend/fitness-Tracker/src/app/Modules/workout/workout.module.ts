import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutComponent } from './workout.component';
import { WorkoutRoutingModule } from './workout-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WorkoutComponent
  ],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    FormsModule
  ],
   exports:[
      WorkoutComponent
    ]
})
export class WorkoutModule { }
