import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './modules/auth/register/register.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { SharedLayoutComponent } from './shared-layout/shared-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileModule } from './modules/profile/profile.module';
import { WorkoutModule } from './modules/workout/workout.module';
import { GoalModule } from './modules/goal/goal.module';
import { AdminDashboardComponent } from './modules/dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './modules/dashboard/user-dashboard/user-dashboard.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthService } from './services/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MealModule } from './modules/meal/meal.module';
import { NutritionModule } from './modules/nutrition/nutrition.module';
import { GlobalErrorHandler } from './interceptors/global-error.handler';
import { PaginationComponent } from './components/pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    SharedLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,

 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ProfileModule,
    WorkoutModule,
    GoalModule,
    DashboardModule,
    AuthModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MealModule,
    NutritionModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    
  },
  { provide: ErrorHandler, useClass: GlobalErrorHandler },

  AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
