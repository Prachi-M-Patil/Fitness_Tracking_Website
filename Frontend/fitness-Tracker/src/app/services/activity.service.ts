import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './admin.service';

export interface ActivityDTO {
    id: number;
    activityType: string;
    duration: number;
    distance: number;
    date: Date;
    user: User;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'http://localhost:3300/api/activities';

  constructor(private http: HttpClient) {}

  getAllActivities(): Observable<ActivityDTO[]> {
    return this.http.get<ActivityDTO[]>(this.apiUrl);
  }

  getActivityById(id: number): Observable<ActivityDTO> {
    return this.http.get<ActivityDTO>(`${this.apiUrl}/${id}`);
  }

  addActivity(activity: ActivityDTO): Observable<ActivityDTO> {
    return this.http.post<ActivityDTO>(this.apiUrl, activity);
  }

  updateActivity(id: number, activity: ActivityDTO): Observable<ActivityDTO> {
    return this.http.put<ActivityDTO>(`${this.apiUrl}/${id}`, activity);
  }

  deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
