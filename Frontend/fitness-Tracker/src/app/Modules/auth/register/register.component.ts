import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    mobile: '',
    email: '',
    role: 'user'
  };

  message: string | undefined;

  constructor(private authservice: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authservice.register(this.user).subscribe(
      (response) => {
        this.message = 'Registration successful';
        alert(this.message);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.message = 'Failed to register user';
        console.error('Registration error:', error);
      }
    );
  }

  toggleToLogin(): void {
    this.router.navigate(['/login']);
  }
}
