import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionComponent } from './nutrition.component';

const routes: Routes = [
  { path: 'nutritions', component: NutritionComponent },
  { path: '', component: NutritionComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutritionRoutingModule {}
