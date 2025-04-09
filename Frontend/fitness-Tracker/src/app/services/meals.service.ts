import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

export interface MealDTO {
  id: number; // Unique identifier for the meal
  name: string; // Meal name
  mealtype: string; // Meal type (e.g., Breakfast, Lunch, Dinner)
  calories: number; // Total calories
  protein: number; // Protein content
  carbs: number; // Carbohydrates content
  fats: number; // Fats content
  rating: number; // Meal rating
  liked: boolean; // Whether the meal is liked by the user
  available: boolean; // Whether the meal is available for purchase
  likesCount: number; // Total number of likes
  nutritionId?: number; // Optional: Links to a nutrition entry
  userId?: number; 
  isHeartActive?: boolean// Optional: Links to a specific user
}

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private apiUrl = 'http://localhost:3300/api/meals'; // Base API URL for meals

  constructor(private http: HttpClient) {}

  // **1. Fetch all meals**
  getAllMeals(): Observable<MealDTO[]> {
    return this.http.get<MealDTO[]>(this.apiUrl).pipe(
      catchError((error) => this.handleError(error, 'Error fetching all meals'))
    );
  }

  // **2. Fetch a meal by ID**
  getMealById(id: number): Observable<MealDTO> {
    return this.http.get<MealDTO>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => this.handleError(error, `Error fetching meal with ID ${id}`))
    );
  }

  // **3. Add a new meal**
  addMeal(meal: Partial<MealDTO>): Observable<MealDTO> {
    return this.http.post<MealDTO>(this.apiUrl, meal).pipe(
      catchError((error) => this.handleError(error, 'Error adding a new meal'))
    );
  }

  // **4. Update an existing meal**
  updateMeal(id: number, meal: Partial<MealDTO>): Observable<MealDTO> {
    return this.http.put<MealDTO>(`${this.apiUrl}/${id}`, meal).pipe(
      catchError((error) => this.handleError(error, `Error updating meal with ID ${id}`))
    );
  }

  // **5. Delete a meal**
  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => this.handleError(error, `Error deleting meal with ID ${id}`))
    );
  }



  // **6. Toggle like for a meal**
  toggleMealLike(mealId: number, userId: number): Observable<MealDTO> {
    return this.http.post<MealDTO>(`${this.apiUrl}/${mealId}/toggle-like`, { userId }).pipe(
      catchError((error) => this.handleError(error, `Error toggling like status for meal ID ${mealId}`))
    );
  }

   // **2. Rate a meal**
   rateMeal(mealId: number, userId: number, rating: number): Observable<MealDTO> {
    return this.http.post<MealDTO>(`${this.apiUrl}/${mealId}/rate`, { userId, rating }).pipe(
      catchError((error) => this.handleError(error, `Error rating meal with ID ${mealId}`))
    );
  }

  // **3. Get user-specific meals**
  getUserMeals(userId: number): Observable<MealDTO[]> {
    return this.http.get<MealDTO[]>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError((error) => this.handleError(error, 'Error fetching user meals'))
    );
  }

  // **4. Get liked meals by the user**
  getUserLikedMeals(userId: number): Observable<MealDTO[]> {
    return this.http.get<MealDTO[]>(`${this.apiUrl}/user/${userId}/liked`).pipe(
      catchError((error) => this.handleError(error, 'Error fetching user liked meals'))
    );
  }

  // **5. Log meal nutrition**
  logMealNutrition(mealId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${mealId}/log-nutrition`, { userId }).pipe(
      catchError((error) => this.handleError(error, `Error logging nutrition for meal ID ${mealId}`))
    );
  }

  // **7. Purchase a meal**
  buyMeal(mealId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${mealId}/buy`, { userId }).pipe(
      catchError((error) => this.handleError(error, `Error purchasing meal with ID ${mealId}`))
    );
  }

  // **8. Enhanced error handling**
  private handleError(error: any, contextMessage: string) {
    Swal.fire({
      icon: 'error',
      title: contextMessage,
      text: error.message || 'Something went wrong. Please try again.',
    });
    return throwError(() => new Error(error.message || 'Unknown error occurred.'));
  }
}




// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import Swal from 'sweetalert2';

// export interface MealDTO {
//   id: number;
//   name: string;
//   mealtype: string;
//   calories: number;
//   protein: number;
//   carbs: number;
//   fats: number;
//   rating: number;
//   liked: boolean;
//   available: boolean;
//   likesCount: number;
//   nutritionId?: number; // Links meal to a nutrition entry
//   userId?: number; // Links meal to a specific user
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class MealService {
//   private apiUrl = 'http://localhost:3300/api/meals';

//   constructor(private http: HttpClient) {}

//   // Fetch all meals
//   // getAllMeals(): Observable<MealDTO[]> {
//   //   return this.http.get<MealDTO[]>(this.apiUrl).pipe(
//   //     catchError((error) => this.handleError(error, 'Error fetching meals'))
//   //   );
//   // }
//   getAllMeals(): Observable<MealDTO[]> {
//         return this.http.get<MealDTO[]>(this.apiUrl);
//   }

  
//   // Fetch meal by ID
//   getMealById(id: number): Observable<MealDTO> {
//     return this.http.get<MealDTO>(`${this.apiUrl}/${id}`).pipe(
//       catchError((error) => this.handleError(error, 'Error fetching meal details'))
//     );
//   }

//   // Add a new meal
//   addMeal(meal: MealDTO): Observable<MealDTO> {
//     return this.http.post<MealDTO>(this.apiUrl, meal).pipe(
//       catchError((error) => this.handleError(error, 'Error adding meal'))
//     );
//   }

//   // Update an existing meal
//   updateMeal(id: number, meal: MealDTO): Observable<MealDTO> {
//     return this.http.put<MealDTO>(`${this.apiUrl}/${id}`, meal).pipe(
//       catchError((error) => this.handleError(error, 'Error updating meal'))
//     );
//   }

//   // Delete a meal
//   deleteMeal(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
//       catchError((error) => this.handleError(error, 'Error deleting meal'))
//     );
//   }

//   // Toggle like for a meal
//   toggleMealLike(mealId: number, userId: number): Observable<MealDTO> {
//     return this.http.post<MealDTO>(`${this.apiUrl}/${mealId}/toggle-like`, { userId }).pipe(
//       catchError((error) => this.handleError(error, 'Error toggling meal like status'))
//     );
//   }

//   buyMeal(mealId: number, userId: number): Observable<void> {
//     return this.http.post<void>(`${this.apiUrl}/${mealId}/buy`, { userId });
//   }

//   private handleError(error: any, message: string) {
//     Swal.fire({
//       icon: 'error',
//       title: message,
//       text: error.message || 'Something went wrong!',
//     });
//     return throwError(() => new Error(error));
//   }
// }

