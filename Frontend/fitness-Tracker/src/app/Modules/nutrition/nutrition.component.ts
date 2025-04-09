import { Component, OnInit } from '@angular/core';
import { NutritionService } from '../../services/nutrition.service';
import { MealDTO } from '../../services/meals.service';
import { User } from '../../services/admin.service';

export interface NutritionDTO {
  id: number; // Unique identifier for the nutrition record
  dailyCalories: number; // Total calories for the day
  dailyProtein: number; // Total protein intake for the day
  dailyCarbs: number; // Total carbs intake for the day
  dailyFats: number; // Total fats intake for the day
  meals: MealDTO[]; // List of meals associated with the nutrition record
  user: User; // Associated user details
}

@Component({
  selector: 'app-nutrition',
  standalone: false,
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css'],
})
export class NutritionComponent implements OnInit {
  nutritionRecords: NutritionDTO[] = [];
  dailyNutrition: NutritionDTO | null = null;

  constructor(private nutritionService: NutritionService) {}

  ngOnInit(): void {
    this.fetchAllNutrition();
  }

  // Fetch all nutrition records
  fetchAllNutrition(): void {
    this.nutritionService.getAllNutrition().subscribe(
      (data) => {
        this.nutritionRecords = data;
        console.log(data);
        
      },
      (error) => {
        console.error('Error fetching nutrition data:', error);
      }
    );
  }

  // Calculate daily nutrition for a user
  calculateDailyNutrition(userId: number): void {
    this.nutritionService.calculateDailyNutrition(userId).subscribe(
      (data) => {
        this.dailyNutrition = data;
      },
      (error) => {
        console.error('Error calculating daily nutrition:', error);
      }
    );
  }
}
