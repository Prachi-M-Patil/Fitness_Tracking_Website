import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  username: string | null = '';
  role: string| null = '';
  isSidebarOpen: boolean = false;


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.username = localStorage.getItem('username');
        }
      }
    );

    const userData = localStorage.getItem('user'); // Assume user info is stored under 'user'
    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.username;
      this.role = user.role;
    }

  }

  navigateToDashboard() {
    if (this.role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
 (): void=> {
    this.authService.logout();
    this.isAuthenticated = false;
    this.username = '';
    this.router.navigate(['/login']);
  }

  }
  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.username = '';
    this.router.navigate(['/login']);
  }
}
