import { Component } from '@angular/core';
import { MealDTO, MealService } from '../../../services/meals.service';

@Component({
  selector: 'app-meal-add',
  standalone: false,
  templateUrl: './meal-add.component.html',
  styleUrl: './meal-add.component.css'
})
export class MealAddComponent {
 
  newMeal: MealDTO = {} as MealDTO;

  constructor(private mealService: MealService) {}

  addMeal() {
    this.mealService.addMeal(this.newMeal).subscribe(data => {
      console.log('Meal added:', data);
    });
  }
}


