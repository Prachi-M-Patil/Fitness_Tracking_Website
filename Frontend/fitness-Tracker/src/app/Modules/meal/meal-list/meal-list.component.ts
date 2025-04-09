// src/app/components/meal-list/meal-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MealDTO, MealService } from '../../../services/meals.service';
import { AuthService } from '../../../services/auth.service';
import { PaginationService } from '../../../services/pagination.service';

@Component({
  selector: 'app-meal-list',
  standalone: false,
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css'],
})
export class MealListComponent implements OnInit {
  meals: MealDTO[] = [];
  filteredMeals: MealDTO[] = []; // Meals after search filter
  paginatedMeals: MealDTO[] = []; // Meals for current page
  searchTerm: string = '';
  
  // Pagination properties
  pageSize: number = 5;
  totalItems: number = 0;
  currentPage: number = 1;

  mealColumns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'mealtype', header: 'Type' },
    { field: 'calories', header: 'Calories' },
    { field: 'likesCount', header: 'Likes' },
    { field: 'available', header: 'Available' }
  ];

  constructor(
    private mealService: MealService, 
    private authService: AuthService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.fetchMeals();
    

    // Subscribe to pagination changes
    this.paginationService.currentPage$.subscribe(page => {
      this.currentPage = page;
      this.updatePaginatedMeals();
    });

    this.paginationService.pageSize$.subscribe(size => {
      this.pageSize = size;
      this.updatePaginatedMeals();
    });
  }

  fetchMeals(): void {
    this.mealService.getAllMeals().subscribe(
      (data) => {
        this.meals = data;
        this.filteredMeals = data; // Initialize filtered meals with all meals
        this.totalItems = this.filteredMeals.length;
        this.paginationService.setTotalItems(this.totalItems);
        this.updatePaginatedMeals();
      },
      (error) => {
        console.error('Error fetching meals:', error);
      }
    );
  }

  onSearchTermChange(term: string): void {
    this.searchMeals(term);
  }

  searchMeals(term: string): void {
    const lowerCaseTerm = term.toLowerCase();
    this.filteredMeals = this.meals.filter((meal) =>
      (meal.name && meal.name.toLowerCase().includes(lowerCaseTerm)) ||
      (meal.mealtype && meal.mealtype.toLowerCase().includes(lowerCaseTerm)) ||
      (meal.calories && meal.calories.toString().includes(lowerCaseTerm))
    );
    
    // Update pagination after search
    this.totalItems = this.filteredMeals.length;
    this.paginationService.setTotalItems(this.totalItems);
    
    // Reset to first page on new search
    this.paginationService.goToPage(1);
    this.updatePaginatedMeals();
  }

  updatePaginatedMeals(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.paginatedMeals = this.filteredMeals.slice(startIndex, endIndex);
  }

  confirmDelete(mealId: number): void {
    if (confirm('Are you sure you want to delete this meal?')) {
      this.mealService.deleteMeal(mealId).subscribe(
        () => {
          this.fetchMeals(); // Refresh the list after deletion
          alert('Meal deleted successfully.');
        },
        (error) => {
          console.error('Error deleting meal:', error);
        }
      );
    }
  }

  getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  
  toggleLike(meal: MealDTO): void {
    const userId = 1; // Replace with actual logged-in user ID

    this.mealService.toggleMealLike(meal.id, userId).subscribe(
      (updatedMeal) => {
        meal.liked = updatedMeal.liked;
        meal.likesCount = updatedMeal.likesCount; // Update likes count dynamically
      },
      (error) => {
        console.error('Error toggling like:', error);
      }
    );
  }

  onPageChanged(page: number): void {
    // Additional logic if needed when page changes
    this.updatePaginatedMeals();
  }
}

// import { Component, OnInit } from '@angular/core';
// import { MealDTO, MealService } from '../../../services/meals.service';
// import { AuthService } from '../../../services/auth.service';

// @Component({
//   selector: 'app-meal-list',
//   standalone: false,
//   templateUrl: './meal-list.component.html',
//   styleUrls: ['./meal-list.component.css'],
// })
// export class MealListComponent implements OnInit {
//   meals: MealDTO[] = [];
//   results: MealDTO[] = [];
//   searchTerm: string = '';
//   mealColumns = [
//     { field: 'id', header: 'ID' },
//     { field: 'name', header: 'Name' },
//     { field: 'mealtype', header: 'Type' },
//     { field: 'calories', header: 'Calories' },
//     { field: 'likesCount', header: 'Likes' },
//     { field: 'available', header: 'Available' }
//   ];

//   constructor(private mealService: MealService,private authService: AuthService) {}

//   ngOnInit(): void {
//     this.fetchMeals();
//   }

//   // testError() {
//   //   const obj = null;
//   //   (obj as any).someMethod();  // This will compile but fail at runtime
  
//   //   // OR Method 2: More direct approach
//   //   throw new Error("Test error for global error handler");// TypeError: Cannot read property 'someMethod' of null
//   // }
//   // Fetch all meals from the service
//   fetchMeals(): void {
//     this.mealService.getAllMeals().subscribe(
//       (data) => {
//         this.meals = data;
//         this.results = data; // Initialize results with all meals
//       },
//       (error) => {
//         console.error('Error fetching meals:', error);
//       }
//     );
//   }

//   // Handle changes in the search term
//   onSearchTermChange(term: string): void {
//     this.searchMeals(term);
//   }



//   // Search meals based on the search term
//   searchMeals(term: string): void {
//     const lowerCaseTerm = term.toLowerCase();
//     this.results = this.meals.filter((meal) =>
//       (meal.name && meal.name.toLowerCase().includes(lowerCaseTerm)) ||
//       (meal.mealtype && meal.mealtype.toLowerCase().includes(lowerCaseTerm)) ||
//       (meal.calories && meal.calories.toString().includes(lowerCaseTerm))
//     );
//   }

//   // Confirm and delete a meal
//   confirmDelete(mealId: number): void {
//     if (confirm('Are you sure you want to delete this meal?')) {
//       this.mealService.deleteMeal(mealId).subscribe(
//         () => {
//           this.fetchMeals(); // Refresh the list after deletion
//           alert('Meal deleted successfully.');
//         },
//         (error) => {
//           console.error('Error deleting meal:', error);
//         }
//       );
//     }
//   }

//   getInputValue(event: Event): string {
//     return (event.target as HTMLInputElement).value;
//   }
  
//   toggleLike(meal: MealDTO): void {
//     const userId = 1; // Replace with actual logged-in user ID

//     this.mealService.toggleMealLike(meal.id, userId).subscribe(
//       (updatedMeal) => {
//         meal.liked = updatedMeal.liked;
//         meal.likesCount = updatedMeal.likesCount; // Update likes count dynamically
//       },
//       (error) => {
//         console.error('Error toggling like:', error);
//       }
//     );
//   }
  
  
// }



// // import { Component, OnInit } from '@angular/core';
// // import { Subject } from 'rxjs';
// // import { debounceTime } from 'rxjs/operators';
// // import { MealService, MealDTO } from '../../../services/meals.service';

// // @Component({
// //   selector: 'app-meal-list',
// //   standalone: false,
// //   templateUrl: './meal-list.component.html',
// //   styleUrls: ['./meal-list.component.css'],
// // })
// // export class MealListComponent implements OnInit {
// //   meals: MealDTO[] = [];
// //   results: MealDTO[] = [];
// //   searchTerm: string = '';
// //   searchSubject: Subject<string> = new Subject<string>();
// //   mealColumns = [
// //     { field: 'id', header: 'ID' },
// //     { field: 'name', header: 'Name' },
// //     { field: 'mealtype', header: 'Type' },
// //     { field: 'calories', header: 'Calories' },
// //     { field: 'likesCount', header: 'Likes' }, // Display total likes for the meal
// //     { field: 'available', header: 'Available' } // Display meal availability
// //   ];

// //   constructor(private mealService: MealService) {}

// //   ngOnInit() {
// //     // Fetch all meals on initialization
// //     this.mealService.getAllMeals().subscribe((data) => {
// //       this.meals = data;
// //       this.results = data; // Initialize search results with all meals
// //     });

// //     // Subscribe to search term changes with debounceTime
// //     this.searchSubject.pipe(debounceTime(300)).subscribe((term) => {
// //       this.searchMeals(term);
// //     });
// //   }

// //   // Triggered when the search term changes
// //   onSearchTermChange(term: string) {
// //     this.searchSubject.next(term);
// //   }

// //   // Filter meals based on the search term
// //   searchMeals(term: string) {
// //     const lowerCaseTerm = term.toLowerCase();
// //     this.results = this.meals.filter((meal) =>
// //       (meal.name && meal.name.toLowerCase().includes(lowerCaseTerm)) ||
// //       (meal.mealtype && meal.mealtype.toLowerCase().includes(lowerCaseTerm)) ||
// //       (meal.calories && meal.calories.toString().includes(lowerCaseTerm)) ||
// //       (meal.likesCount && meal.likesCount.toString().includes(lowerCaseTerm)) || // Filter by likesCount
// //       (meal.available && meal.available.toString().includes(lowerCaseTerm)) // Filter by availability
// //     );
// //   }

// //   // Toggle the like/dislike status for a meal
// //   toggleLike(meal: MealDTO) {
// //     this.mealService.toggleMealLike(meal.id, 1 /* Assuming userId is 1 for now */).subscribe((updatedMeal) => {
// //       // Update the likesCount for the meal
// //       meal.likesCount = updatedMeal.likesCount;
// //       meal.liked = updatedMeal.liked;
// //     });
// //   }

// //   // Buy a meal and update its availability
// //   buyMeal(meal: MealDTO) {
// //     this.mealService.buyMeal(meal.id, 1 /* Assuming userId is 1 for now */).subscribe(() => {
// //       // Update the meal's availability
// //       meal.available = false;
// //     });
// //   }
// // }




// // import { Component, OnInit } from '@angular/core';
// // import { Subject } from 'rxjs';
// // import { debounceTime } from 'rxjs/operators';
// // import { MealService, MealDTO } from '../../../services/meals.service';

// // @Component({
// //   selector: 'app-meal-list',
// //   standalone: false,
// //   templateUrl: './meal-list.component.html',
// //   styleUrls: ['./meal-list.component.css']
// // })
// // export class MealListComponent implements OnInit {
// //   meals: MealDTO[] = [];
// //   results: MealDTO[] = [];
// //   searchTerm: string = '';
// //   searchSubject: Subject<string> = new Subject<string>();
// //   mealColumns = [
// //     { field: 'id', header: 'ID' },
// //     { field: 'name', header: 'Name' },
// //     { field: 'mealtype', header: 'Type' },
// //     { field: 'calories', header: 'Calories' }
// //   ];

// //   constructor(private mealService: MealService) {}

// //   ngOnInit() {
// //     this.mealService.getAllMeals().subscribe(data => {
// //       this.meals = data;
// //       this.results = data;
// //     });

// //     this.searchSubject.pipe(
// //       debounceTime(300)
// //     ).subscribe(term => {
// //       this.searchMeals(term);
// //     });
// //   }

// //   onSearchTermChange(term: string) {
// //     this.searchSubject.next(term);
// //   }

// //   searchMeals(term: string) {
// //     const lowerCaseTerm = term.toLowerCase();
// //     this.results = this.meals.filter(meal =>
// //       (meal.name && meal.name.toLowerCase().includes(lowerCaseTerm)) ||
// //       (meal.mealtype && meal.mealtype.toLowerCase().includes(lowerCaseTerm)) ||
// //       (meal.calories && meal.calories.toString().includes(lowerCaseTerm))
// //     );
// //   }
// // }


// // import { Component, OnInit } from '@angular/core';
// // import { AuthService } from '../../../services/auth.service';
// // import { MealDTO, MealService } from '../../../services/meals.service';
// // import { Subject } from 'rxjs';
// // import { debounceTime } from 'rxjs/operators';

// // @Component({
// //   selector: 'app-meal-list',
// //   standalone: false,
// //   templateUrl: './meal-list.component.html',
// //   styleUrls: ['./meal-list.component.css']
// // })
// // export class MealListComponent implements OnInit {
// //   meals: MealDTO[] = [];
// //   userId: number;
// //   searchTerm: string = '';
// //   results: MealDTO[] = [];
// //   searchSubject: Subject<string> = new Subject<string>(); // Subject for search term

// //   constructor(private mealService: MealService, private authService: AuthService) {
// //     this.userId = this.authService.getUserId();
// //   }

// //   ngOnInit() {
// //     this.mealService.getAllMeals().subscribe(data => {
// //       this.meals = data;
// //       this.results = data; // Initialize results with all meals
// //     });

// //     // Subscribe to the Subject and apply debounceTime
// //     this.searchSubject.pipe(
// //       debounceTime(300) // Wait 300ms before processing search
// //     ).subscribe(term => {
// //       this.searchMeals(term);
// //     });

// //     console.log("fetching meals");
// //   }

// //   onSearchTermChange(term: string) {
// //     this.searchSubject.next(term); // Emit new search term
// //   }

// //   searchMeals(term: string) {
// //     const lowerCaseTerm = term.toLowerCase();
// //     this.results = this.meals.filter(meal =>
// //       (meal.name && meal.name.toLowerCase().includes(lowerCaseTerm)) ||
// //       (meal.mealtype && meal.mealtype.toLowerCase().includes(lowerCaseTerm)) ||
// //       (meal.calories && meal.calories.toString().includes(lowerCaseTerm))||
// //       (meal.available && meal.available.toString().includes(lowerCaseTerm))

// //     );
// //   }
// // }


//   // getUserRole(): boolean{
//   //   const role = this.authService.getUserRole();
//   //   console.log(role);
//   //   if(role=== 'admin'){
//   //     return true;
//   //   }
//   //   return false;
//   // }

