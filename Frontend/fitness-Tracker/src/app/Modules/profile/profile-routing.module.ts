import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileViewComponent } from './profileview/profileview.component';
const routes: Routes = [
  {
    path: 'profile', // Route for profile management
    component: ProfileComponent,
  },
  {
    path: 'profile/:userId', // Route to view a specific user's profile
    component: ProfileComponent,
  },
  { path: 'profile-view', component: ProfileViewComponent },
  { path: '', redirectTo: '/profile-view', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
