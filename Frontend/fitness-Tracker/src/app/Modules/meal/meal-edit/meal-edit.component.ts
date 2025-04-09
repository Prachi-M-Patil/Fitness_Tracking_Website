import { Component } from '@angular/core';
import { MealDTO, MealService } from '../../../services/meals.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meal-edit',
  standalone: false,
  templateUrl: './meal-edit.component.html',
  styleUrl: './meal-edit.component.css'
})
export class MealEditComponent {

  meal: MealDTO = {} as MealDTO; // Initialize with an empty object
  constructor(private mealService: MealService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.mealService.getMealById(id).subscribe(data => {
      this.meal = data;
    });
  }

  updateMeal() {
    this.mealService.updateMeal(this.meal.id, this.meal).subscribe(data => {
      console.log('Meal updated:', data);

          // ✅ Show SweetAlert on success
          Swal.fire({
            icon: 'success',
            title: 'Meal Updated',
            text: 'The meal was updated successfully!',
            confirmButtonColor: '#3085d6'
          });
    });
  }
}

