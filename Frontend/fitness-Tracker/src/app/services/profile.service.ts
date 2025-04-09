import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Profile {
  id?: number;
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  fitnessLevel: string;
  profilePicture?: File | null;
  user?: { id: number };
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'http://localhost:3300/api/profile'; // Replace with your backend URL
  private profileSubject = new BehaviorSubject<Profile | null>(null);
  profile$ = this.profileSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Fetch a profile by userId
  // getProfile(userId: number): Observable<Profile> {
  //   const token = this.authService.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<Profile>(`${this.baseUrl}/profile/${userId}`, { headers }).;
  // }

  // Fetch a profile by userId
  getProfile(userId: number): void {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<Profile>(`${this.baseUrl}/profile/${userId}`, { headers }).subscribe(
      profile => this.profileSubject.next(profile),
      error => console.error('Error fetching profile:', error)
    );
  };


  // Create a new profile
  createProfile(profile: Profile): void {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post<Profile>(`${this.baseUrl}/createprofile`, profile, { headers }).subscribe( 
      newProfile => this.profileSubject.next(newProfile),
      error => console.error('Error creating profile:', error)
    );
  }


  uploadProfilePicture(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profilePicture', file);
  
    return this.http.post(`${this.baseUrl}/upload-profile-picture/${userId}`, formData);
  }
  

  // Update an existing profile
  // updateProfile(userId: number, profile: Partial<Profile>): Observable<Profile> {
  //   const token = this.authService.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.put<Profile>(`${this.baseUrl}/profile/${userId}`, profile, { headers });
  // }
  
  updateProfile(userId: number, profile: Partial<Profile>): void {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.put<Profile>(`${this.baseUrl}/profile/${userId}`, profile, { headers }).subscribe(
      updatedProfile => this.profileSubject.next(updatedProfile),
      error => console.error('Error updating profile:', error)
    );
  }


  // deleteProfile(userId: number): Observable<void> {
  //   const token = this.authService.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.delete<void>(`${this.baseUrl}/delete/${userId}`, { headers });
  // }
  deleteProfile(userId: number): void {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete<void>(`${this.baseUrl}/delete/${userId}`, { headers }).subscribe(
      () => this.profileSubject.next(null),
      error => console.error('Error deleting profile:', error)
  );
}

}
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { decodeToken } from '../getToken/getToken';
// import { AuthService } from './auth.service';

// export interface Profile {
//   name: string;
//   age: number;
//   gender: string;
//   weight: number;
//   height: number;
//   fitnessLevel: string;
//   user?: { id: number };
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class ProfileService {
//   token = localStorage.getItem('authToken');
//   userId = decodeToken(this.token!);
//   private baseUrl = 'http://localhost:3300/api/profile'; // Replace with your backend URL

//   constructor(private http: HttpClient, private authervice: AuthService) {}

//   // Fetch a profile by userId
//   getProfile(userId: number): Observable<Profile> { 
//     return this.http.get<Profile>(`${this.baseUrl}/profile/${userId}`);
//   }

//   // Create a new profile
//   createProfile(profile: Profile): Observable<Profile> {
//     return this.http.post<Profile>(`${this.baseUrl}/createprofile`, profile);
//   }

//   // Update an existing profile
//   updateProfile(userId: number, profile: Partial<Profile>): Observable<Profile> {
   
//     return this.http.put<Profile>(`${this.baseUrl}/profile/${userId}`, profile);
//   }
// }
