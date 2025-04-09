import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Workout {
  id?: number;            // Workout ID (optional for creation)
  type: string;           // Type of workout (e.g., running, cycling)
  duration: number;       // Duration in minutes
  date: string; 
  completed: boolean;          // Date of workout (ISO format)
  caloriesBurned: number; // Total calories burned
  goalIds?: number[];     // IDs of goals this workout contributes to (optional)
}


@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private baseUrl = 'http://localhost:3300/api/workout';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Log a new workout
  logWorkout(userId: number, workoutData: Workout): Observable<Workout> {
    return this.http.post<Workout>(`${this.baseUrl}/logWorkout`, { userId, workoutData }, { headers: this.getHeaders() });
  }

  // Fetch all workouts for a specific user
  getWorkouts(userId: number): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.baseUrl}/getWorkouts?userId=${userId}`, { headers: this.getHeaders() });
  }

  // Delete a workout
  deleteWorkout(workoutId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/workouts/${workoutId}`, { headers: this.getHeaders() });
  }

  markWorkoutAsCompleted(workoutId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/completeWorkout`, { workoutId }, { headers: this.getHeaders() });
  }
  
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// export interface Workout {
//   id?: number;
//   type: string;
//   duration: number;
//   date: Date;
//   caloriesBurned: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class WorkoutService {
 
//   private baseUrl= 'http://localhost:3300/api/workout';

//   constructor(private http:HttpClient) { }

//   logworkout(userId: number, workoutData: Workout): Observable<Workout>{
//     return this.http.post<Workout>(`${this.baseUrl}/logworkout`, {userId, workoutData});
//   }

//   getWorkouts(userId: number): Observable<Workout[]>
// {
//   return this.http.post<Workout[]>(`${this.baseUrl}/getworkouts/`, {userId});
// }}
