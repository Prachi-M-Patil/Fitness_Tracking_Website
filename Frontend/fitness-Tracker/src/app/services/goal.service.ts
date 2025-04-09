
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Goal {
  id?: number;        // Goal ID (optional for creation)
  name: string;       // Goal name
  goalType: string;   // Type of the goal (e.g., weight loss, fitness improvement)
  target: string;     // Target description (e.g., lose 5 kg, run 5km)
  deadline?: string;  // Deadline (optional, ISO format)
  progress: number;   // Progress percentage (default 0)
  achieved: boolean;  // Whether the goal is achieved (default false)
  createdAt?: string; // Creation timestamp (optional)
  userId: number;     // ID of the associated user
  // requiredWorkouts: 0;
  requiredWorkoutTypes: string[] ,
  workoutIds?: number[]; // IDs of associated workouts (optional)
}


@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private baseUrl = 'http://localhost:3300/api/goals';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Fetch all goals for a specific user
  getGoals(userId: number): Observable<Goal[]> {
    
    return this.http.get<Goal[]>(`${this.baseUrl}/getGoals?userId=${userId}`, { headers: this.getHeaders() });
  }
  
  // Create a new goal
  createGoal(userId: number, goalData: Goal): Observable<Goal> {
    return this.http.post<Goal>(`${this.baseUrl}/createGoal`, { userId, goalData }, { headers: this.getHeaders() });
  }

  // Update progress or mark a goal as achieved
  updateGoal(goalId: number): Observable<Goal> {
    return this.http.put<Goal>(`${this.baseUrl}/updateGoal`, { goalId }, { headers: this.getHeaders() });
  }

  // Delete a goal
  deleteGoal(goalId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/goals/${goalId}`, { headers: this.getHeaders() });
  }

  updateGoalProgress(goalId: number): Observable<Goal> {
    return this.http.patch<Goal>(`${this.baseUrl}/updateProgress/${goalId}`, {});
  }
}


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';

// export interface Goal {
//   id?: number;
//   name: string;
//   goalType: string;
//   target: string;
//   deadline?: string;
//   progress?: number;
//   achieved?: boolean;
//   createdAt?: string;
//   userId: number;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class GoalService {
//   private baseUrl = 'http://localhost:3300/api/goals'; 

//   constructor(private http: HttpClient, private authService: AuthService) {}

//   // Fetch all goals for a specific user
//   getGoals(userId: number): Observable<Goal[]> {
//     const token = this.authService.getToken();
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get<Goal[]>(`${this.baseUrl}/getgoals?userId=${userId}`, { headers });
//   }

//   // Create a new goal
//   createGoal(userId: number, goalData: Goal): Observable<Goal> {
//     const token = this.authService.getToken();
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.post<Goal>(`${this.baseUrl}/createGoal`, { userId, goalData }, { headers });
//   }

//   // Update goal
//   updateGoal(goalId: number, progress: number, achieved: boolean): Observable<Goal> {
//     const token = this.authService.getToken();
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.put<Goal>(`${this.baseUrl}/updateGoal`, { goalId, progress, achieved }, { headers });
//   }

//   // Delete a goal
//   deleteGoal(goalId: number): Observable<void> {
//     const token = this.authService.getToken();
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.delete<void>(`${this.baseUrl}/goals/${goalId}`, { headers });
//   }
// }