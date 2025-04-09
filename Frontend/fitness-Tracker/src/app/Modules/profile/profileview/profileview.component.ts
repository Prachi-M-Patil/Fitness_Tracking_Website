import { Component, OnInit } from '@angular/core';
import { ProfileService, Profile } from '../../../services/profile.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-view',
  standalone: false,
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css'],
})
export class ProfileViewComponent implements OnInit {
  profile$: Observable<Profile | null>;
  userId: number = 0;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {
    this.profile$ = this.profileService.profile$;
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.profileService.getProfile(this.userId);
  }

  // Navigate to edit profile
  editProfile(): void {
    this.router.navigate(['/profile/profile']);
  }

  // Delete profile
  deleteProfile(): void {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.profileService.deleteProfile(this.userId);
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
