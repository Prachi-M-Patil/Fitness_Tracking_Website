import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private zone: NgZone,
    private router: Router
  ) {}

  handleError(error: any): void {
    // Log the error details
    console.log('🔴 GlobalErrorHandler caught:', error);
    console.error('Global error handler caught an error:', error);

    // Use NgZone to ensure Angular's change detection is triggered
    this.zone.run(() => {
      // You can add different handling based on error types
      Swal.fire({
        icon: 'error',
        title: 'Application Error',
        text: 'An unexpected error occurred. Please try again later.',
      });

      // Optional: Redirect to error page for severe errors
      // this.router.navigate(['/error']);
    });
  }
}