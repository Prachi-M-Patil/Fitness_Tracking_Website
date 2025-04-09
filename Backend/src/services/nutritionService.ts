import { Nutrition } from "../entities/Nutrition";
import { Meal } from "../entities/Meal";
import { nutritionRepository } from "../repositories/NutritionRepo";
import { userRepository } from "../repositories/UserRepo";
import { mealRepository } from "../repositories/mealRepo";

export class NutritionService {
    // Add nutrition data
    async addNutrition(nutritionData: Partial<Nutrition>): Promise<Nutrition> {
        const user = await userRepository.findOne({ where: { id: nutritionData.user.id } });

        if (!user) {
            throw new Error(`User with ID ${nutritionData.user.id} not found.`);
        }

        const meals = await mealRepository.findByIds(nutritionData.meals.map(meal => meal.id));

        if (meals.length !== nutritionData.meals.length) {
            throw new Error(`Some meals not found.`);
        }

        const nutrition = nutritionRepository.create({
            dailyCalories: nutritionData.dailyCalories,
            dailyProtein: nutritionData.dailyProtein,
            dailyCarbs: nutritionData.dailyCarbs,
            dailyFats: nutritionData.dailyFats,
            user,
            meals
        });

        return await nutritionRepository.save(nutrition);
    }

    // Update nutrition data
    async updateNutrition(nutritionId: number, nutritionData: Partial<Nutrition>): Promise<Nutrition | null> {
        const nutrition = await nutritionRepository.findOne({ where: { id: nutritionId }, relations: ["meals", "user"] });

        if (!nutrition) {
            return null;
        }

        // Update user relationship if provided
        if (nutritionData.user) {
            const user = await userRepository.findOne({ where: { id: nutritionData.user.id } });
            if (!user) throw new Error(`User with ID ${nutritionData.user.id} not found.`);
            nutrition.user = user;
        }

        // Update meals relationship if provided
        if (nutritionData.meals) {
            const meals = await mealRepository.findByIds(nutritionData.meals.map(meal => meal.id));
            if (meals.length !== nutritionData.meals.length) throw new Error(`Some meals not found.`);
            nutrition.meals = meals;
        }

        Object.assign(nutrition, nutritionData);
        return await nutritionRepository.save(nutrition);
    }

    // Delete nutrition entry
    async deleteNutrition(nutritionId: number): Promise<void> {
        const nutrition = await nutritionRepository.findOne({ where: { id: nutritionId }, relations: ["meals"] });

        if (!nutrition) {
            throw new Error(`Nutrition record not found.`);
        }

        await nutritionRepository.delete(nutritionId);
    }

    // Get nutrition by ID
    async getNutritionById(nutritionId: number): Promise<Nutrition | null> {
        return await nutritionRepository.findOne({ where: { id: nutritionId }, relations: ["meals", "user"] });
    }

    // Get all nutrition data
    async getAllNutrition(): Promise<Nutrition[]> {
        return await nutritionRepository.find({ relations: ["meals", "user"] });
    }

    // Get nutrition data for a user
    async getUserNutrition(userId: number): Promise<Nutrition[]> {
        return await nutritionRepository.find({ where: { user: { id: userId } }, relations: ["meals", "user"] });
    }

    // Calculate total daily nutrition for a user
    async calculateDailyNutrition(userId: number): Promise<Nutrition | null> {
        const user = await userRepository.findOne({ where: { id: userId } });
    
        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }
    
        const meals = await mealRepository.find({ where: { users: { id: userId } } });
    
        if (!meals.length) {
            return null;
        }
    
        const dailyCalories = meals.reduce((total, meal) => total + (meal.calories || 0), 0);
        const dailyProtein = meals.reduce((total, meal) => total + (meal.protein || 0), 0);
        const dailyCarbs = meals.reduce((total, meal) => total + (meal.carbs || 0), 0);
        const dailyFats = meals.reduce((total, meal) => total + (meal.fats || 0), 0);
    
        const nutrition = nutritionRepository.create({
            dailyCalories,
            dailyProtein,
            dailyCarbs,
            dailyFats,
            user,
        });
    
        return await nutritionRepository.save(nutrition);
    }
    
}
