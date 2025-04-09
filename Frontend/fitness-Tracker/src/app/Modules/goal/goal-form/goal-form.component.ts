import { Component } from '@angular/core';
import { Goal, GoalService } from '../../../services/goal.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-goal-form',
  standalone: false,
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.css'],
})
export class GoalFormComponent {
  goalData: Partial<Goal> = {
    name: '',
    target: '',
    deadline: '',
    progress: 0,
    achieved: false,
    requiredWorkoutTypes: [],
    workoutIds: [],
    userId: 1
  };
  userId: number = 1; // Replace with dynamic user ID

  constructor(private goalService: GoalService, private authservice: AuthService) {
    this.userId =  this.authservice.getUserId();
    console.log("userId", this.userId);

  }
  createGoal(): void {
    console.log(this.userId);
    // Ensure name and all required fields are defined
    if (!this.goalData.name || !this.goalData.target) {
      alert('Please provide a valid name and target for the goal.');
      return;
    }
  
    const goalToCreate: Goal = {
      id: this.goalData.id, // Optional field
      name: this.goalData.name as string, // Explicitly cast to string
      goalType: this.goalData.name as string, // Map name to goalType
      target: this.goalData.target as string,
      deadline: this.goalData.deadline || '',
      progress: this.goalData.progress || 0,
      achieved: false, // Default value
      userId: this.userId, // Dynamic user ID
      requiredWorkoutTypes: this.goalData.requiredWorkoutTypes || [],
      workoutIds: [5]
    };
  
    this.goalService.createGoal(this.userId, goalToCreate).subscribe(() => {
      alert('Goal created successfully!');
      this.goalService.getGoals(this.userId);
      this.resetForm();
    });
  }
  

  addWorkoutType(type: string): void {
    if (type && !this.goalData.requiredWorkoutTypes!.includes(type)) {
      this.goalData.requiredWorkoutTypes!.push(type);
    }
  }

  removeWorkoutType(type: string): void {
    this.goalData.requiredWorkoutTypes = this.goalData.requiredWorkoutTypes!.filter(t => t !== type);
  }

  resetForm(): void {
    this.goalData = {
      name: '',
      target: '',
      deadline: '',
      progress: 0,
      achieved: false,
      requiredWorkoutTypes: [],
      workoutIds: [],
    };
  }
availableWorkoutTypes: string[] = ['Yoga', 'Strength', 'Cardio', 'Aerobics', 'Pilates','Zumba',
  'Cycling',
  'Running',
  'Swimming',
  'Rowing',
  'Kickboxing',
  'Boxing',
  'Martial Arts',
  'Dance Fitness', ];

// toggleWorkoutType(type: string, isChecked: boolean): void {
//   if (isChecked && !this.goalData.requiredWorkoutTypes!.includes(type)) {
//     this.goalData.requiredWorkoutTypes!.push(type);
//   } else if (!isChecked) {
//     this.goalData.requiredWorkoutTypes = this.goalData.requiredWorkoutTypes!.filter(t => t !== type);
//   }
// }
toggleWorkoutType(type: string, event: Event): void {
  const inputElement = event.target as HTMLInputElement; // Cast EventTarget to HTMLInputElement
  const isChecked = inputElement.checked;

  if (isChecked && !this.goalData.requiredWorkoutTypes!.includes(type)) {
    this.goalData.requiredWorkoutTypes!.push(type);
  } else if (!isChecked) {
    this.goalData.requiredWorkoutTypes = this.goalData.requiredWorkoutTypes!.filter(t => t !== type);
  }
}


}


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// import { Goal, GoalService } from '../../../services/goal.service';
// import { AuthService } from '../../../services/auth.service';

// @Component({
//   selector: 'app-goal-form',
//   standalone: false,
//   templateUrl: './goal-form.component.html',
//   styleUrls: ['./goal-form.component.css']
// })
// export class GoalFormComponent {
//   goal: Goal = {
//     name: '',
//     goalType: '',
//     target: '',
//     deadline: '',
//     progress: 0,
//     achieved: false,
//     userId: 1,
//     requiredWorkoutTypes: []
//   };
//   userId : number = 0;
//   workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga']; // Replace with dynamic backend data
//   constructor(
//     private goalService: GoalService,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.userId = this.authService.getUserId();
//   }

//   toggleWorkoutType(type: string): void {
//     const index = this.goal.requiredWorkoutTypes.indexOf(type);
//     if (index > -1) {
//       this.goal.requiredWorkoutTypes.splice(index, 1);
//     } else {
//       this.goal.requiredWorkoutTypes.push(type);
//     }
//   }

//   saveGoal(): void {
//     const userId = this.authService.getUserId();
//     this.goalService.createGoal(userId, this.goal).subscribe(() => {
//       this.router.navigate(['/goals/list']);
//     });
//   }
// }

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../../services/auth.service';
// import { Goal, GoalService } from '../../../services/goal.service';

// @Component({
//   selector: 'app-goal-form',
//   standalone: false,
//   templateUrl: './goal-form.component.html',
//   styleUrls: ['./goal-form.component.css']
// })
// export class GoalFormComponent {
//   goal: Goal = {
//     name: '',
//     goalType: '',
//     target: '',
//     progress: 0,
//     achieved: false,
//     workoutIds: [], // Ensure it's initialized as an array
//     userId: 0
//   };

//   // Hardcoded workout types
//   workoutTypes: { id: number; name: string }[] = [
//     { id: 1, name: 'Running' },
//     { id: 2, name: 'Cycling' },
//     { id: 3, name: 'Swimming' },
//     { id: 4, name: 'Yoga' }
//   ];

//   constructor(private goalService: GoalService, private authService: AuthService, private router: Router) {
//     this.goal.userId = this.authService.getUserId(); // Fetch the userId from AuthService/localStorage
//   }

//   createGoal(): void {
//     if (!this.goal.name || !this.goal.target || !this.goal.workoutIds?.length) {
//       console.error('Please complete all required fields');
//       return;
//     }

//     this.goalService.createGoal(this.goal.userId, this.goal).subscribe(() => {
//       this.router.navigate(['/goals/list']);
//     });
//   }

//   toggleWorkoutSelection(workoutId: number): void {
//     if (this.goal.workoutIds?.includes(workoutId)) {
//       this.goal.workoutIds = this.goal.workoutIds.filter(id => id !== workoutId); // Remove if already selected
//     } else {
//       this.goal.workoutIds?.push(workoutId); // Add if not selected
//     }
//   }
// }

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { Goal, GoalService } from '../../../services/goal.service';
// import { AuthService } from '../../../services/auth.service';
// @Component({
//   selector: 'app-goal-form',
//   standalone: false,
//   templateUrl: './goal-form.component.html',
//   styleUrls: ['./goal-form.component.css']
// })
// export class GoalFormComponent {
//   goal: Goal = {
//     name: '',
//     goalType: '',
//     target: '',
//     progress: 0,
//     achieved: false,
//     userId: 0 // Replace with dynamic logic if needed
//   };
//   userId: number;

//   constructor(private goalService: GoalService, private router: Router, private authservice: AuthService) {
//     this.userId = this.authservice.getUserId();
//     this.goal.userId = this.userId;
//   }

//   // createGoal(): void {
//   //   this.goalService.createGoal(this.goal.userId, this.goal).subscribe(() => {
//   //     this.router.navigate(['/goals/list']);
//   //   });
//   // }
//   createGoal(): void {
//     const userId = this.authservice.getUserId(); // Fetch the userId from localStorage or AuthService
  
//     if (this.goal.name && this.goal.target && this.goal.workoutIds?.length) {
//       this.goalService.createGoal(userId, this.goal).subscribe(() => {
//         console.log("goal created");
//         this.router.navigate(['/goals/list']);
//       });
//     } else {
//       console.error('Missing required fields: userId, name, target, or workoutIds');
//     }
//   }
  
// }


// // import { Component } from '@angular/core';
// // import { Goal, GoalService } from '../../../services/goal.service';
// // import { AuthService } from '../../../services/auth.service';
// // import Swal from 'sweetalert2';

// // @Component({
// //   selector: 'app-goal-form',
// //   standalone: false,
// //   templateUrl: './goal-form.component.html',
// //   styleUrls: ['./goal-form.component.css']
// // })
// // export class GoalFormComponent {
// //   goal: Goal = {
// //     name: '',
// //     goalType: '',
// //     target: '',
// //     deadline: '',
// //     progress: 0,
// //     achieved: false,
// //     createdAt: '',
// //     userId: 0
// //   };
// //   userId: number;

// //   constructor(private goalService: GoalService, private authService: AuthService) {
// //     this.userId = this.authService.getUserId();
// //     this.goal.userId = this.userId; // Ensure userId is defined
// //   }

// //   createGoal(): void {
// //     // Ensure all required fields are set
// //     if (this.goal.name && this.goal.target && this.goal.userId) {
// //       console.log('Creating goal with data:', this.goal); // Log the goal data
// //       this.goalService.createGoal(this.userId, this.goal).subscribe({
// //         next: (newGoal) => {
// //           console.log('Goal created:', newGoal);
// //           Swal.fire({
// //             title: 'Success!',
// //             text: 'Your goal has been created successfully.',
// //             icon: 'success',
// //             confirmButtonText: 'OK'
// //           });
// //           this.resetForm();
// //         },
// //         error:(error) => {
// //           console.error('Error creating goal:', error);
// //           Swal.fire({
// //             title: 'Error!',
// //             text: 'There was an error creating your goal. Please try again.',
// //             icon: 'error',
// //             confirmButtonText: 'OK'
// //           });
// //         }
// //       }
// //       );
// //     } else {
// //       console.error('Missing required fields: userId, name, or target');
// //       Swal.fire({
// //         title: 'Warning!',
// //         text: 'Please fill in all required fields.',
// //         icon: 'warning',
// //         confirmButtonText: 'OK'
// //       });
// //     }
// //   }

// //   resetForm(): void {
// //     this.goal = {
// //       name: '',
// //       goalType: '',
// //       target: '',
// //       deadline: '',
// //       progress: 0,
// //       achieved: false,
// //       createdAt: '',
// //       userId: this.userId
// //     };
// //   }
// // }
