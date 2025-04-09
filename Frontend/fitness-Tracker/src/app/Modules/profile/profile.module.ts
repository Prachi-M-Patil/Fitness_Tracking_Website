import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileViewComponent } from './profileview/profileview.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HoverhighlightDirective } from '../../shared/directives/hoverhighlight.directive';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileViewComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25,
    //   logOnly: environment.production
    // })

  ],
  exports:[
    ProfileComponent,
    ProfileViewComponent
  ]
})
export class ProfileModule { }
