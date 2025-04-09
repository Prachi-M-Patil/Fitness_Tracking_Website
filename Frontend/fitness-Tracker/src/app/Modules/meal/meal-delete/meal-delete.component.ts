import { Component } from '@angular/core';
import { MealService } from '../../../services/meals.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-meal-delete',
  standalone: false,
  templateUrl: './meal-delete.component.html',
  styleUrl: './meal-delete.component.css'
})
export class MealDeleteComponent {
    id!: number;
    constructor(private mealService: MealService, private route: ActivatedRoute, private router: Router) {}
  
    ngOnInit() {
      this.id = +this.route.snapshot.paramMap.get('id')!;
    }
  
    deleteMeal() {
      this.mealService.deleteMeal(this.id).subscribe(() => {
        console.log(`Meal with id ${this.id} deleted.`);
        this.router.navigate(['/meal-list']); // Redirect after deletion
      });
    }
}
  

