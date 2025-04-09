import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Goal } from './goal.service';

export interface User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  mobile?: number;
  active?: boolean;
  role?: 'user' | 'admin';
  profile?: Profile;
  workouts?: Workout[];
  goals?: Goal[];
  activities?: Activity[];
  meals?: Meal[];
  nutrition?: Nutrition;
}

export interface Profile {
  id?: number;
  firstName?: string;
  lastName?: string;
  age?: number;
  gender?: string;
  user?: User;
}

export interface Workout {
  id?: number;
  type?: string;
  duration?: number;
  date?: Date;
  caloriesBurned?: number;
  user?: User;
  exercises?: Exercise[];
}

// export interface Goal {
//   id?: number;
//   goalType?: string;
//   target?: string;
//   achieved?: boolean;
//   progress?: number;
//   createdAt?: Date;
//   deadline?: string;
//   user?: User;
// }

export interface Activity {
  id?: number;
  name?: string;
  duration?: number;
  user?: User;
}

export interface Meal {
  id?: number;
  name?: string;
  calories?: number;
  Protein?: number;
  carbs?: number;
  fats?: number;
  rating?: number;
  liked?: boolean;
  imageUrl?: string;
  available?: boolean;
  nutrition?: Nutrition;
  users?: User[];
}

export interface Nutrition {
  id?: number;
  dailyCalories?: number;
  dailyProtein?: number;
  dailyCarbs?: number;
  dailyFats?: number;
  meals?: Meal[];
  user?: User;
}

export interface Exercise {
  id?: number;
  name?: string;
  sets?: number;
  reps?: number;
  weight?: number;
  workout?: Workout;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private baseUrl = 'http://localhost:3300/api/admin'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  addUser(userData: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, userData, { headers: this.getHeaders() });
  }

  deactivateUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${userId}`, { headers: this.getHeaders() });
  }

  activateUser(userId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/activate-user/${userId}`, {}, { headers: this.getHeaders() });
  }

  updateUser(userId: number, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${userId}`, userData, { headers: this.getHeaders() });
  }

  searchUsers(query: Partial<User>): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`, { headers: this.getHeaders(), params: query as any });
  }

  getUserWorkouts(userId: number): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.baseUrl}/users/${userId}/workouts`, { headers: this.getHeaders() });
  }

  getUserGoals(userId: number): Observable<Goal[]> {
    return this.http.get<Goal[]>(`${this.baseUrl}/users/${userId}/goals`, { headers: this.getHeaders() });
  }

  getUserActivities(userId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.baseUrl}/users/${userId}/activities`, { headers: this.getHeaders() });
  }

  getUserMeals(userId: number): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.baseUrl}/users/${userId}/meals`, { headers: this.getHeaders() });
  }

  getUserLikedMeals(userId: number): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.baseUrl}/users/${userId}/liked-meals`, { headers: this.getHeaders() });
  }

  getDeactivatedUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/deactivated-users`, { headers: this.getHeaders() });
  }

  getUserDetails(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user-details/${userId}`, { headers: this.getHeaders() });
  }

  updateUserDetails(userId: number, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update-user/${userId}`, userData, { headers: this.getHeaders() });
  }
}
