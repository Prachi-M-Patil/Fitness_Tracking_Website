import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { AdminDashboardService } from '../../../services/admin.service';
import { User } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  currentSection: string = 'dashboard';
  users: User[] = [];
  deactivatedUsers: User[] = [];
  userData: Partial<User> = {
    username: '',
    email: '',
    password: '',
    mobile: 0,
    role: 'user'
  };

  constructor(
    private adminDashboardService: AdminDashboardService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
 

 ngOnInit(): void {
    this.fetchUsers();
    this.fetchDeactivatedUsers();
  }

  setSection(section: string): void {
    this.currentSection = section;
  }

  fetchUsers(): void {
    this.adminDashboardService.searchUsers({ active: true }).subscribe(
      (response) => {
        this.users = response;
        console.log('Active users:', this.users);
      },
      (error) => {
        console.error('Error fetching active users:', error);
        this.showErrorSnackbar('Error fetching active users');
      }
    );
  }

  fetchDeactivatedUsers(): void {
    this.adminDashboardService.getDeactivatedUsers().subscribe(
      (response) => {
        this.deactivatedUsers = response;
        console.log('Deactivated users:', this.deactivatedUsers);
      },
      (error) => {
        console.error('Error fetching deactivated users:', error);
        this.showErrorSnackbar('Error fetching deactivated users');
      }
    );
  }

  addUser(): void {
    this.adminDashboardService.addUser(this.userData).subscribe(
      (response) => {
        console.log('User added:', response);
        this.fetchUsers(); // Refresh the list of users
        this.showSuccessSnackbar('User added successfully');
      },
      (error) => {
        console.error('Error adding user:', error);
        this.showErrorSnackbar('Error adding user');
      }
    );
  }

  confirmDeactivateUser(userId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to deactivate this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deactivateUser(userId);
      }
    });
  }

  deactivateUser(userId: number): void {
    this.adminDashboardService.deactivateUser(userId).subscribe(
      (response) => {
        console.log('User deactivated:', response);
        this.fetchUsers(); // Refresh the list of users
        this.fetchDeactivatedUsers(); // Refresh the list of deactivated users
        this.showSuccessSnackbar('User deactivated successfully');
      },
      (error) => {
        console.error('Error deactivating user:', error);
        this.showErrorSnackbar('Error deactivating user');
      }
    );
  }

  activateUser(userId: number): void {
    this.adminDashboardService.activateUser(userId).subscribe(
      (response) => {
        console.log('User activated:', response);
        this.fetchUsers(); // Refresh the list of users
        this.fetchDeactivatedUsers(); // Refresh the list of deactivated users
        this.showSuccessSnackbar('User activated successfully');
      },
      (error) => {
        console.error('Error activating user:', error);
        this.showErrorSnackbar('Error activating user');
      }
    );
  }

  updateUser(userId: number): void {
    this.router.navigate(['/user-details', userId]);
    this.showSuccessSnackbar('Navigating to user details');
  }

  showSuccessSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['snackbar-success']
    });
  }

  showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['snackbar-error']
    });
  }
}
