import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import Swal from 'sweetalert2'; // SweetAlert for alerts

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Retrieve the user object from localStorage
    const userJson = localStorage.getItem('user');
    let userRole = '';

    // Check if user object exists in localStorage and extract the role
    if (userJson) {
      try {
        const user = JSON.parse(userJson); // Parse the JSON string
        userRole = user.role;
        console.log(userRole); // Extract role from the user object
      } catch (error) {
        console.error('Error parsing user JSON:', error);
      }
    }

    // Get the required roles from route data
    const allowedRoles = route.data['role'];

    // Check if allowedRoles is defined and is an array
    if (Array.isArray(allowedRoles) && allowedRoles.includes(userRole)) {
      return true; // Grant access
    }

    // Trigger SweetAlert for unauthorized access
    Swal.fire({
      icon: 'warning',
      title: 'Access Denied',
      text: 'You do not have the necessary permissions to access this page.',
      confirmButtonColor: '#e74c3c',
    });

    // Redirect to an unauthorized page
    this.router.navigate(['/unauthorized']);
    return false; // Block access
  }
}
