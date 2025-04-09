import { Meal } from "../entities/Meal";
import { Nutrition } from "../entities/Nutrition";
import { userRepository } from "../repositories/UserRepo";
import { nutritionRepository } from "../repositories/NutritionRepo";
import { mealRepository } from "../repositories/mealRepo";

export class MealService {
    // Add a new meal
    async addMeal(mealData: Partial<Meal>): Promise<Meal> {
        const meal = mealRepository.create(mealData);
        meal.likesCount = 0; // Initialize likesCount
        return await mealRepository.save(meal);
    }

    // Update an existing meal
    async updateMeal(mealId: number, mealData: Partial<Meal>): Promise<Meal | null> {
        const meal = await mealRepository.findOne({ where: { id: mealId } });

        if (!meal) {
            return null;
        }

        Object.assign(meal, mealData);
        meal.likesCount = meal.likesCount || 0; // Ensure likesCount is initialized to 0 if missing
        return await mealRepository.save(meal);
    }

    // Delete a meal
    async deleteMeal(mealId: number): Promise<void> {
        const meal = await mealRepository.findOne({ where: { id: mealId } });

        if (!meal) {
            throw new Error(`Meal with ID ${mealId} not found.`);
        }

        await mealRepository.remove(meal);
    }

    // Fetch a specific meal by ID
    async getMealById(mealId: number): Promise<Meal | null> {
        return await mealRepository.findOne({ where: { id: mealId }, relations: ["users", "nutrition"] });
    }

    // Fetch all meals with total likes calculated
    async getAllMeals(): Promise<Meal[]> {
        const meals = await mealRepository.find({ relations: ["users", "nutrition"] });
        console.log("meals",meals);

        for (const meal of meals) {
            meal.likesCount = meal.users?.length || 0;
        }
        return meals;
    } catch (error) {
        throw new Error(`Failed to fetch all meals: ${error.message}`);

        // // Calculate total likes for each meal
        // for (const meal of meals) {
        //     meal.likesCount = meal.users ? meal.users.length : 0 || 0;
        // }

        // return meals;
    }

    // Fetch meals for a specific user
    async getUserMeals(userId: number): Promise<Meal[]> {
        return await mealRepository.find({ where: { users: { id: userId } }, relations: ["users", "nutrition"] });
    }

    // Log nutrition for a meal
    async logMealNutrition(mealId: number, nutritionData: Partial<Nutrition>): Promise<Nutrition> {
        const meal = await mealRepository.findOne({ where: { id: mealId }, relations: ["nutrition"] });

        if (!meal) {
            throw new Error(`Meal with ID ${mealId} not found.`);
        }

        const nutrition = nutritionRepository.create({
            ...nutritionData,
            meals: [meal],
        });

        return await nutritionRepository.save(nutrition);
    }

    // Fetch meals liked by a user
    async getUserLikedMeals(userId: number): Promise<Meal[]> {
        const user = await userRepository.findOne({ where: { id: userId }, relations: ["meals"] });

        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        return user.meals.filter(meal => meal.liked === true);
    }

    // Toggle like/dislike for a meal
    async toggleMealLike(mealId: number, userId: number): Promise<Meal> {
        const user = await userRepository.findOne({ where: { id: userId }, relations: ["meals"] });

        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        const meal = await mealRepository.findOne({ where: { id: mealId } });

        if (!meal) {
            throw new Error(`Meal with ID ${mealId} not found.`);
        }

        // Check if the meal is already liked by the user
        const alreadyLiked = user.meals.some(likedMeal => likedMeal.id === mealId);

        if (alreadyLiked) {
            // If already liked, remove the association and decrement the `likesCount`
            user.meals = user.meals.filter(likedMeal => likedMeal.id !== mealId);
            await userRepository.save(user);

            meal.likesCount = Math.max((meal.likesCount || 0) - 1, 0);
        } else {
            // If not liked, add the association and increment the `likesCount`
            user.meals.push(meal);
            await userRepository.save(user);

            meal.likesCount = (meal.likesCount || 0) + 1;
        }

        return await mealRepository.save(meal);
    }

    // Add buy option for a meal
    async buyMeal(mealId: number, userId: number): Promise<string> {
        const meal = await mealRepository.findOne({ where: { id: mealId } });

        if (!meal) {
            throw new Error(`Meal with ID ${mealId} not found.`);
        }

        if (!meal.available) {
            throw new Error(`Meal with ID ${mealId} is not available for purchase.`);
        }

        // Update the meal's availability
        meal.available = false;
        await mealRepository.save(meal);

        // Optionally, link the purchase to the user
        const user = await userRepository.findOne({ where: { id: userId }, relations: ["meals"] });
        if (user) {
            user.meals.push(meal);
            await userRepository.save(user);
        }

        return `Meal with ID ${mealId} purchased successfully by User ID ${userId}.`;
    }

    // async getLikesCount(): Observable<number> {
    //     return this.http.get<number>('/api/likes/count');
    //   }

    
}

// import { Meal } from "../entities/Meal";
// import { Nutrition } from "../entities/Nutrition";
// import { userRepository } from "../repositories/UserRepo"; // Assuming a repository for User exists
// import { nutritionRepository } from "../repositories/NutritionRepo";
// import { mealRepository } from "../repositories/mealRepo";

// export class MealService {
//     async addMeal(mealData: Partial<Meal>): Promise<Meal> {
//         const meal = mealRepository.create(mealData);
//         return await mealRepository.save(meal);
//     }

//     async updateMeal(mealId: number, mealData: Partial<Meal>): Promise<Meal | null> {
//         const meal = await mealRepository.findOne({ where: { id: mealId } });

//         if (!meal) {
//             return null;
//         }

//         Object.assign(meal, mealData);
//         return await mealRepository.save(meal);
//     }

//     async deleteMeal(mealId: number): Promise<void> {
//         await mealRepository.delete(mealId);
//     }

//     async getMealById(mealId: number): Promise<Meal | null> {
//         return await mealRepository.findOne({ where: { id: mealId }, relations: ["users", "nutrition"] });
//     }

//     async getAllMeals(): Promise<Meal[]> {
//         return await mealRepository.find({ relations: ["users", "nutrition"] });
//     }

//     async getUserMeals(userId: number): Promise<Meal[]> {
//         return await mealRepository.find({ where: { users: { id: userId } }, relations: ["users", "nutrition"] });
//     }

//     async logMealNutrition(mealId: number, nutritionData: Partial<Nutrition>): Promise<Nutrition> {
//         const meal = await mealRepository.findOne({ where: { id: mealId }, relations: ["nutrition"] });

//         if (!meal) {
//             throw new Error(`Meal with ID ${mealId} not found.`);
//         }

//         const nutrition = nutritionRepository.create({
//             ...nutritionData,
//             meals: [meal],
//         });

//         return await nutritionRepository.save(nutrition);
//     }

//     async getUserLikedMeals(userId: number): Promise<Meal[]> {
//         const user = await userRepository.findOne({ where: { id: userId }, relations: ["meals"] });

//         if (!user) {
//             throw new Error(`User with ID ${userId} not found.`);
//         }

//         // Filter meals based on the `liked` property
//         const mealList = user.meals.filter(meal => meal.liked === true);
//         console.log(mealList);
//         return mealList;
//     }
//     async toggleMealLike(mealId: number, userId: number): Promise<Meal> {
//         const user = await userRepository.findOne({ where: { id: userId }, relations: ["meals"] });
    
//         if (!user) {
//             throw new Error(`User with ID ${userId} not found.`);
//         }
    
//         const meal = await mealRepository.findOne({ where: { id: mealId } });
    
//         if (!meal) {
//             throw new Error(`Meal with ID ${mealId} not found.`);
//         }
    
//         // Check if the meal is already liked by the user
//         const alreadyLiked = user.meals.some(likedMeal => likedMeal.id === mealId);
    
//         if (alreadyLiked) {
//             // If already liked, remove the association and update the `liked` flag
//             user.meals = user.meals.filter(likedMeal => likedMeal.id !== mealId);
//             await userRepository.save(user);
    
//             meal.liked = false;
//         } else {
//             // If not liked, add the association and update the `liked` flag
//             user.meals.push(meal);
//             await userRepository.save(user);
    
//             meal.liked = true;
//         }
    
//         await mealRepository.save(meal);
//         return meal;
//     }
    
    
// }
