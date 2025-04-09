import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NutritionComponent } from './nutrition.component';
import { NutritionRoutingModule } from './nutrition-routing.module';
import { NutritionService } from '../../services/nutrition.service';



@NgModule({
  declarations: [
    NutritionComponent
  ],
  imports: [
    CommonModule,
    NutritionRoutingModule
  ],
  providers: [NutritionService],
  exports:[
    NutritionComponent
  ]
})
export class NutritionModule { }
