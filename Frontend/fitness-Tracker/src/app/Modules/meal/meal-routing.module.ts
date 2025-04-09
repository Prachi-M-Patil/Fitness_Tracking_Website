import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleGuard } from '../../guards/role.guard';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealAddComponent } from './meal-add/meal-add.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealEditComponent } from './meal-edit/meal-edit.component';
import { MealDeleteComponent } from './meal-delete/meal-delete.component';


const routes: Routes = [
  {
    path: 'meal-list', // Route for logging meals 
    component: MealListComponent,
  },
  {
    path: 'add-meal',  
    component: MealAddComponent, canActivate: [RoleGuard],
    data: { role: ['admin']}
  },
  {path: 'meal-details/:id', component: MealDetailsComponent, canActivate: [RoleGuard],
    data: { role: ['admin', 'user']}},
  { path: 'meal-edit/:id', component: MealEditComponent ,canActivate: [RoleGuard],
    data: { role: ['admin']}},
  { path: 'meal-delete/:id', component: MealDeleteComponent, canActivate: [RoleGuard],
    data: { role: ['admin']}},
  {path:'', component: MealListComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealRoutingModule {}
