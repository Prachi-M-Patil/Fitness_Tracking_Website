import { Component, OnInit } from '@angular/core';
import { GoalService, Goal } from '../../../services/goal.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-goal-list',
  standalone: false,
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {
  goals: Goal[] = []; // Array to store fetched goals
  userId: number =1; // Replace with dynamic user ID logic if needed

  constructor(private goalService: GoalService, private authservice: AuthService) {
    this.userId = this.authservice.getUserId()
  }

  ngOnInit(): void {
    this.fetchGoals(); // Fetch the goals on initialization
  }

  fetchGoals(): void {
    this.userId = this.authservice.getUserId();
    // this.goal.userId = this.userId;
    this.goalService.getGoals(this.userId).subscribe(goals => {
      console.log(goals);
      this.goals = goals;
    });
  }

  deleteGoal(goalId: number): void {
    this.goalService.deleteGoal(goalId).subscribe(() => {
      this.goals = this.goals.filter(goal => goal.id !== goalId);
    });
  }

  updateGoal(goalId: number): void {
    this.goalService.updateGoal(goalId).subscribe(updatedGoal => {
      const index = this.goals.findIndex(goal => goal.id === goalId);
      if (index !== -1) {
        this.goals[index] = updatedGoal;
      }
    });
  }
}
