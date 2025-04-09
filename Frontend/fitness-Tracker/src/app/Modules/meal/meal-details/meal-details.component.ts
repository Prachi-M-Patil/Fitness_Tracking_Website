import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealDTO, MealService } from '../../../services/meals.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-meal-details',
  standalone: false,
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css'],
})
export class MealDetailsComponent implements OnInit {
  meal: MealDTO | null = null; // Current meal details
  userMeals: MealDTO[] = []; // Meals specific to the logged-in user
  likedMeals: MealDTO[] = []; // Liked meals by the user
  userId: number | null = null; // Logged-in user's ID

  ratingValue: number = 0; // User-provided meal rating
  nutritionLogMessage: string = ''; // Logging meal nutrition message

  constructor(
    private mealService: MealService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId(); // Fetch logged-in user's ID
    const mealId = this.route.snapshot.params['id'];

    // Fetch meal details
    this.mealService.getMealById(mealId).subscribe(
      (data) => (this.meal = data),
      (error) => console.error('Error fetching meal details:', error)
    );

    // Fetch user meals
    this.fetchUserMeals();

    // Fetch liked meals
    // this.fetchLikedMeals();
  }

  // Fetch all meals specific to the user
  fetchUserMeals(): void {
    this.mealService.getUserMeals(this.userId!).subscribe(
      (data) => (this.userMeals = data),
      (error) => console.error('Error fetching user meals:', error)
    );
  }

  // Fetch all liked meals by the user
  fetchLikedMeals(): void {
    this.mealService.getUserLikedMeals(this.userId!).subscribe(
      (data) => (this.likedMeals = data),
      (error) => console.error('Error fetching liked meals:', error)
    );
  }

  // Log meal nutrition
  logMealNutrition(): void {
    if (this.meal) {
      this.mealService.logMealNutrition(this.meal.id, this.userId!).subscribe(
        () => (this.nutritionLogMessage = 'Meal nutrition logged successfully!'),
        (error) => {
          console.error('Error logging meal nutrition:', error);
          this.nutritionLogMessage = 'Failed to log meal nutrition.';
        }
      );
    }
  }

  // Buy meal and update its availability
  buyMeal(): void {
    if (this.meal) {
      this.mealService.buyMeal(this.meal.id, this.userId!).subscribe(
        () => {
          this.meal!.available = false;
          alert('Meal purchased successfully!');
        },
        (error) => console.error('Error purchasing meal:', error)
      );
    }
  }

  // Rate meal
  rateMeal(): void {
    if (this.meal) {
      this.mealService.rateMeal(this.meal.id, this.userId!, this.ratingValue).subscribe(
        (updatedMeal) => {
          this.meal!.rating = updatedMeal.rating;
          alert(`Thank you for rating! Updated rating: ${updatedMeal.rating}`);
        },
        (error) => console.error('Error rating meal:', error)
      );
    }
  }
}
