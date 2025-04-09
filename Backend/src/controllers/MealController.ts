import { Request, Response } from "express";
import { MealService } from "../services/MealService";
import { NutritionService } from "../services/nutritionService";
import { CustomError } from "../utils/errorhandler";

export class MealController {
    private mealService: MealService;

    constructor(mealService: MealService, private nutritionService: NutritionService) {
        this.mealService = mealService;
        this.nutritionService = nutritionService;
    }

    // Add a new meal
    async addMeal(req: Request, res: Response): Promise<void> {
        // throw new Error('you dont have permission to add meals');
        try {
            const meal = await this.mealService.addMeal(req.body);
            res.status(201).json(meal);
        } catch (error) {
            // res.status(500).json({ message: error.message });
            console.log("global error handler");
            throw new CustomError('you dont have permission to add meals', 400);
            // This will be caught by your error handler middleware
        }
    }

    // Update an existing meal
    async updateMeal(req: Request, res: Response): Promise<void> {
        try {
            const mealId = parseInt(req.params.id, 10);
            const updatedMeal = await this.mealService.updateMeal(mealId, req.body);

            if (!updatedMeal) {
                res.status(404).json({ message: "Meal not found." });
            } else {
                res.status(200).json(updatedMeal);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Delete a meal
    async deleteMeal(req: Request, res: Response): Promise<void> {
        try {
            const mealId = parseInt(req.params.id, 10);
            await this.mealService.deleteMeal(mealId);
            res.status(200).json({ message: "Meal deleted successfully." });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Fetch a specific meal by ID
    async getMealById(req: Request, res: Response): Promise<void> {
        try {
            const mealId = parseInt(req.params.id, 10);
            const meal = await this.mealService.getMealById(mealId);

            if (!meal) {
                res.status(404).json({ message: "Meal not found." });
            } else {
                res.status(200).json(meal);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Fetch all meals
    async getAllMeals(req: Request, res: Response): Promise<void> {
        try {
            console.log("fetching meals");
            const meals = await this.mealService.getAllMeals();
            res.status(200).json(meals);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Fetch meals for a specific user
    async getUserMeals(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const meals = await this.mealService.getUserMeals(userId);

            if (!meals.length) {
                res.status(404).json({ message: "No meals found for this user." });
            } else {
                res.status(200).json(meals);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Fetch liked meals for a specific user
    async getUserLikedMeals(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const likedMeals = await this.mealService.getUserLikedMeals(userId);

            if (!likedMeals.length) {
                res.status(404).json({ message: "No liked meals found for this user." });
            } else {
                res.status(200).json(likedMeals);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Log nutrition for a meal
    async logMealNutrition(req: Request, res: Response): Promise<void> {
        try {
            const mealId = parseInt(req.params.mealId, 10);
            const nutrition = await this.mealService.logMealNutrition(mealId, req.body);

            res.status(200).json(nutrition);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Toggle like/dislike for a meal
    async toggleMealLike(req: Request, res: Response): Promise<void> {
        try {
            const mealId = parseInt(req.params.mealId, 10);
            const userId = parseInt(req.body.userId, 10);
            const updatedMeal = await this.mealService.toggleMealLike(mealId, userId);

            res.status(200).json(updatedMeal);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Buy a meal
    async buyMeal(req: Request, res: Response): Promise<void> {
        try {
            const mealId = parseInt(req.params.mealId, 10);
            const userId = parseInt(req.body.userId, 10);
            const message = await this.mealService.buyMeal(mealId, userId);

            res.status(200).json({ message });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
