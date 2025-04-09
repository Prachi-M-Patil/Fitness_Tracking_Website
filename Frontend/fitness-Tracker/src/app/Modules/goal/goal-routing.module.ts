import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalListComponent } from './goal-list/goal-list.component';
import { GoalFormComponent } from './goal-form/goal-form.component';

const routes: Routes = [
    { path: 'goals/list', component: GoalListComponent },
    { path: 'create-goal', component: GoalFormComponent },
    { path: '', redirectTo: 'create-goal', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalRoutingModule {}
