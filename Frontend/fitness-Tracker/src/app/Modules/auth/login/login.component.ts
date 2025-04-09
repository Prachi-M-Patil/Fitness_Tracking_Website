import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    username: '',
    password: ''
  };

  message: string | undefined;
  isAuthenticated: boolean = false;
  username: string | null = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.username = localStorage.getItem('username');
        }
      }
    );
  }

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        this.message = response.message;
        alert('Login successful');
        console.log('Login successful:', response);
        localStorage.setItem('username', this.credentials.username);
        this.router.navigate(['/profile/createprofile']);
      },
      (error) => {
        this.message = 'Failed to login user';
        console.error('Login error:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.username = '';
    this.router.navigate(['/login']);
  }

  loginWithGoogle(): void {
    alert('Google login triggered!');
    // Integrate actual Google OAuth logic here
  }

  loginWithApple(): void {
    alert('Apple login triggered!');
    // Integrate actual Apple OAuth logic here
  }

  loginWithFacebook(): void {
    alert('Facebook login triggered!');
    // Integrate actual Facebook OAuth logic here
  }

  toggleToRegister(): void {
    this.router.navigate(['/register']);
  }
}


// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../../services/auth.service';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: false,
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   credentials = {
//     username: '',
//     password: ''
//   };

//   message: string | undefined;
//   isAuthenticated: boolean = false;
//   username: string | null = '';

//   constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.authService.isAuthenticated().subscribe(
//       (isAuthenticated) => {
//         this.isAuthenticated = isAuthenticated;
//         if (isAuthenticated) {
//           this.username = localStorage.getItem('username');
//         }
//       }
//     );
//   }

//   onSubmit(): void {
//     this.authService.login(this.credentials).subscribe(
//       (response) => {
//         this.message = response.message;
//         alert('Login successful');
//         console.log('Login successful:', response);
//         localStorage.setItem('username', this.credentials.username);
//         this.router.navigate(['/profile/createprofile']);
//       },
//       (error) => {
//         this.message = 'Failed to login user';
//         console.error('Login error:', error);
//       }
//     );
//   }

//   logout(): void {
//     this.authService.logout();
//     this.isAuthenticated = false;
//     this.username = '';
//     this.router.navigate(['/login']);
//   }

//   loginWithGoogle(): void {
//     alert('Google login triggered!');
//     // Integrate actual Google OAuth logic here
//   }

//   loginWithApple(): void {
//     alert('Apple login triggered!');
//     // Integrate actual Apple OAuth logic here
//   }

//   loginWithFacebook(): void {
//     alert('Facebook login triggered!');
//     // Integrate actual Facebook OAuth logic here
//   }

//   toggleToRegister(): void {
//     this.router.navigate(['/register']);
//   }
// }
