import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to Login by default
  {
    path: 'profile', // Lazy load the ProfileModule
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard]
  },
  {
    path: 'workout', // Lazy load the workoutModule
    loadChildren: () => import('./modules/workout/workout.module').then(m => m.WorkoutModule),  canActivate: [AuthGuard]
  },
  { path: 'goal', loadChildren: () => import('./modules/goal/goal.module').then(m => m.GoalModule) , canActivate: [AuthGuard] },
  
  {path: 'meal', loadChildren:()=> import('./modules/meal/meal.module').then(m=> m.MealModule), canActivate: [AuthGuard]},
  {path: 'nutritions', loadChildren:()=> import('./modules/nutrition/nutrition.module').then(m=> m.NutritionModule), canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
