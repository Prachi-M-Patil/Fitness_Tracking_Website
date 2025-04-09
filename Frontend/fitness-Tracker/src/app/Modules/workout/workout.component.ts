
import { Component, OnInit } from '@angular/core';
import { Workout, WorkoutService } from '../../services/workout.service';
import { AuthService } from '../../services/auth.service';
import { GoalService } from '../../services/goal.service';

@Component({
  selector: 'app-workout',
  standalone: false,
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  workouts: Workout[] = []; // List of workouts
  userId: number;

  constructor(
    private workoutService: WorkoutService,
    private goalService: GoalService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId(); // Fetch user ID
  }

  ngOnInit(): void {
    this.fetchWorkouts();
  }

  fetchWorkouts(): void {
    this.workoutService.getWorkouts(this.userId).subscribe(workouts => {
      this.workouts = workouts;
    });
  }

  markWorkoutAsCompleted(workoutId: number): void {
    this.workoutService.markWorkoutAsCompleted(workoutId).subscribe(() => {
      this.fetchWorkouts(); // Refresh workouts
    });
  }

  calculateGoalProgress(): void {
    this.goalService.getGoals(this.userId).subscribe(goals => {
        goals.forEach(goal => {
            if (!goal.workoutIds || goal.workoutIds.length === 0) {
                console.error(`Goal ${goal.id} has no associated workouts`);
                return;
            }
            if (goal.workoutIds !== undefined && goal.workoutIds.length > 0) {
            const completedWorkouts = this.workouts.filter(workout =>
                workout.id !== undefined && goal.workoutIds?.includes(workout.id) && workout.completed
            ).length;

            goal.progress = Math.round((completedWorkouts / goal.workoutIds.length) * 100);

            if (goal.progress === 100) {
                goal.achieved = true;
            }
          }

            if (goal.id !== undefined) {
                this.goalService.updateGoal(goal.id).subscribe(); // Update goal progress
            } else {
                console.error("Goal ID is undefined");
            }
        });
    });
}

}


// import { Component, OnInit } from '@angular/core';
// import { Workout, WorkoutService } from '../../services/workout.service';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-workout',
//   standalone: false,
//   templateUrl: './workout.component.html',
//   styleUrls: ['./workout.component.css']
// })
// export class WorkoutComponent implements OnInit {
//   workouts: Workout[] = []; // Array to store workouts
//   newWorkout: Workout = { type: '', duration: 0, date: '', caloriesBurned: 0 }; // Model for a new workout
//   userId: number; // Logged-in user ID

//   constructor(private workoutService: WorkoutService, private authService: AuthService) {
//     this.userId = this.authService.getUserId(); // Fetch the user ID from AuthService
//   }

//   ngOnInit(): void {
//     this.fetchWorkouts(); // Fetch workouts on initialization
//   }

//   // Fetch all workouts for the user
//   fetchWorkouts(): void {
//     this.workoutService.getWorkouts(this.userId).subscribe(workouts => {
//       this.workouts = workouts;
//     });
//   }

//   // Add a new workout
//   addWorkout(): void {
//     if (this.newWorkout.type && this.newWorkout.duration && this.newWorkout.date) {
//       this.workoutService.logWorkout(this.userId, this.newWorkout).subscribe(workout => {
//         this.workouts.push(workout); // Add the new workout to the list
//         this.newWorkout = { type: '', duration: 0, date: '', caloriesBurned: 0 }; // Reset the form
//       });
//     }
//   }

//   // Delete a workout
//   deleteWorkout(workoutId: number): void {
//     this.workoutService.deleteWorkout(workoutId).subscribe(() => {
//       this.workouts = this.workouts.filter(workout => workout.id !== workoutId); // Remove from the list
//     });
//   }
// }

// // import { Component, OnInit } from '@angular/core';
// // import { Workout, WorkoutService } from '../../services/workout.service';
// // import { AuthService } from '../../services/auth.service';
// // @Component({
// //   selector: 'app-workout',
// //   standalone : false,
// //   templateUrl: './workout.component.html',
// //   styleUrls: ['./workout.component.css'],
// // })
// // export class WorkoutComponent implements OnInit {
// //   workouts: Workout[] = [];
// //   newWorkout: Workout = {
// //     type: '',
// //     duration: 0,
// //     date: new Date(), // Format the initial date
// //     caloriesBurned: 0,
// //   };
// //   userId: number = 0; // Replace with dynamic user ID
// //   message: string = '';

// //   constructor(private workoutService: WorkoutService, private authService: AuthService) {}

// //   ngOnInit(): void {
// //     this.userId = this.authService.getUserId();
// //     // this.newWorkout.id = this.userId;
// //     this.fetchWorkouts();
// //   }

// //   // Utility function to format dates
// //   formatDate(date: Date): string {
// //     return date.toISOString().split('T')[0]; // Returns the date in "yyyy-MM-dd" format
// //   }

// //   fetchWorkouts(): void {
// //     this.workoutService.getWorkouts(this.userId).subscribe({
// //       next: (data: Workout[]) => {
// //         this.workouts = data;
// //       },
// //       error: (err: any) => {
// //         console.error('Error fetching workouts:', err);
// //         this.message = 'Failed to load workouts.';
// //       },
// //     });
// //   }

// //   logWorkout(): void {
// //     // Convert the date string (yyyy-MM-dd) from the input to a Date object
// //     const formattedDate = new Date(this.newWorkout.date);
  
// //     // Assign the converted Date object to newWorkout.date
// //     this.newWorkout.date = formattedDate;
  
// //     this.workoutService.logworkout(this.userId, this.newWorkout).subscribe({
// //       next: (data: Workout) => {
// //         this.message = 'Workout logged successfully!';
// //         this.workouts.push(data);
// //         this.newWorkout = {
// //           type: '',
// //           duration: 0,
// //           date: new Date(), // Reset date to today's date
// //           caloriesBurned: 0,
// //         };
// //       },
// //       error: (err: any) => {
// //         console.error('Error logging workout:', err);
// //         this.message = 'Failed to log workout.';
// //       },
// //     });
// //   }

  
// // }  