import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NutritionDTO {
  id: number;
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFats: number;
  meals: any[];
  user: any;
}

@Injectable({
  providedIn: 'root',
})
export class NutritionService {
  private apiBaseUrl = 'http://localhost:3300/api/nutritions';

  constructor(private http: HttpClient) {}

  // Fetch all nutrition records
  getAllNutrition(): Observable<NutritionDTO[]> {
    return this.http.get<NutritionDTO[]>(`${this.apiBaseUrl}/nutrition`);
  }

  // Fetch a specific nutrition record by ID
  getNutritionById(id: number): Observable<NutritionDTO> {
    return this.http.get<NutritionDTO>(`${this.apiBaseUrl}/${id}`);
  }

  // Add a new nutrition record
  addNutrition(nutrition: NutritionDTO): Observable<NutritionDTO> {
    return this.http.post<NutritionDTO>(`${this.apiBaseUrl}/nutrition`, nutrition);
  }

  // Update a nutrition record by ID
  updateNutrition(id: number, nutrition: NutritionDTO): Observable<NutritionDTO> {
    return this.http.put<NutritionDTO>(`${this.apiBaseUrl}/nutrition/${id}`, nutrition);
  }

  // Delete a nutrition record
  deleteNutrition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/nutrition/${id}`);
  }

  // Calculate daily nutrition for a specific user
  calculateDailyNutrition(userId: number): Observable<NutritionDTO> {
    return this.http.get<NutritionDTO>(`${this.apiBaseUrl}/user/${userId}/daily`);
  }
}
