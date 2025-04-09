
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfileService, Profile } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  navigateToLogin(role: string): void {
    // Check if the profile is complete
    this.checkProfileCompletion().then((isProfileComplete) => {
      if (!isProfileComplete) {
        // Show SweetAlert2 popup
        Swal.fire({
          title: 'Incomplete Profile',
          text: 'Please complete and save your profile first.',
          icon: 'warning',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Navigate to profile page
            this.router.navigate(['/profile/createprofile']);
          }
        });
      } else {
        // Navigate to the appropriate dashboard based on role
        const user = this.authService.getCurrentUser();
        if (user.username === 'admin' && user.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/user-dashboard']);
        }
      }
    });
  }

  async checkProfileCompletion(): Promise<boolean> {
        const userId = this.authService.getUserId();
        this.profileService.getProfile(userId);
        const profile = await firstValueFrom(this.profileService.profile$);
        if (profile === null) {
          return false;
        }
    
        return profile && profile.name !== '' && profile.age > 0 && profile.gender !== '' && profile.weight > 0 && profile.height > 0 && profile.fitnessLevel !== '';
      }
    
}


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
// import { ProfileService, Profile } from '../../services/profile.service';
// import { AuthService } from '../../services/auth.service';
// import { firstValueFrom } from 'rxjs';

// @Component({
//   selector: 'app-dashboard',
//   standalone: false,
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent {
//   constructor(
//     private router: Router,
//     private profileService: ProfileService,
//     private authService: AuthService
//   ) {}

//   navigateToLogin(role: string): void {
//     // Check if the profile is complete
//     this.checkProfileCompletion().then((isProfileComplete) => {
//       if (!isProfileComplete) {
//         // Show SweetAlert2 popup
//         Swal.fire({
//           title: 'Incomplete Profile',
//           text: 'Please complete and save your profile first.',
//           icon: 'warning',
//           confirmButtonText: 'OK'
//         }).then((result) => {
//           if (result.isConfirmed) {
//             // Navigate to profile page
//             this.router.navigate(['/profile/createprofile']);
//           }
//         });
//       } else {
//         // Navigate to the appropriate dashboard based on role
//         if (role === 'admin') {
//           this.router.navigate(['/admin-dashboard']);
//         } else {
//           this.router.navigate(['/user-dashboard']);
//         }
//       }
//     });
//   }

// //   async checkProfileCompletion(): Promise<boolean> {
// //     const userId = this.authService.getUserId();
// //     const profile = await firstValueFrom(this.profileService.getProfile(userId));
    
// //     if (profile === null || profile === undefined) {
// //         return false;
// //     }

// //     return profile.name !== '' && profile.age > 0 && profile.gender !== '' && profile.weight > 0 && profile.height > 0 && profile.fitnessLevel !== '';
// // }


//   async checkProfileCompletion(): Promise<boolean> {
//     const userId = this.authService.getUserId();
//     this.profileService.getProfile(userId);
//     const profile = await firstValueFrom(this.profileService.profile$);
//     if (profile === null) {
//       return false;
//     }

//     return profile && profile.name !== '' && profile.age > 0 && profile.gender !== '' && profile.weight > 0 && profile.height > 0 && profile.fitnessLevel !== '';
//   }
// }
// // firstValueFrom is a function from RxJS that converts an observable to a promise.
// //  It subscribes to the observable and returns a promise that resolves as soon as
// //  the first value is emitted from the observable. Once the first value is received, 
// // the subscription is closed