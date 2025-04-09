import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2'; // SweetAlert library

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          // Trigger SweetAlert message for unauthorized access
          Swal.fire({
            icon: 'warning',
            title: 'Unauthorized Access',
            text: 'please login first...You must be logged in to access.',
            confirmButtonColor: '#3498db',
          });

          // Redirect to login page
          
          this.router.navigate(['/login']);
        }

        return isAuthenticated;
      })
    );
  }
}
