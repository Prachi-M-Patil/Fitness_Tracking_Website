"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NutritionService = void 0;
const NutritionRepo_1 = require("../repositories/NutritionRepo");
const UserRepo_1 = require("../repositories/UserRepo");
const mealRepo_1 = require("../repositories/mealRepo");
class NutritionService {
    // Add nutrition data
    addNutrition(nutritionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepo_1.userRepository.findOne({ where: { id: nutritionData.user.id } });
            if (!user) {
                throw new Error(`User with ID ${nutritionData.user.id} not found.`);
            }
            const meals = yield mealRepo_1.mealRepository.findByIds(nutritionData.meals.map(meal => meal.id));
            if (meals.length !== nutritionData.meals.length) {
                throw new Error(`Some meals not found.`);
            }
            const nutrition = NutritionRepo_1.nutritionRepository.create({
                dailyCalories: nutritionData.dailyCalories,
                dailyProtein: nutritionData.dailyProtein,
                dailyCarbs: nutritionData.dailyCarbs,
                dailyFats: nutritionData.dailyFats,
                user,
                meals
            });
            return yield NutritionRepo_1.nutritionRepository.save(nutrition);
        });
    }
    // Update nutrition data
    updateNutrition(nutritionId, nutritionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const nutrition = yield NutritionRepo_1.nutritionRepository.findOne({ where: { id: nutritionId }, relations: ["meals", "user"] });
            if (!nutrition) {
                return null;
            }
            // Update user relationship if provided
            if (nutritionData.user) {
                const user = yield UserRepo_1.userRepository.findOne({ where: { id: nutritionData.user.id } });
                if (!user)
                    throw new Error(`User with ID ${nutritionData.user.id} not found.`);
                nutrition.user = user;
            }
            // Update meals relationship if provided
            if (nutritionData.meals) {
                const meals = yield mealRepo_1.mealRepository.findByIds(nutritionData.meals.map(meal => meal.id));
                if (meals.length !== nutritionData.meals.length)
                    throw new Error(`Some meals not found.`);
                nutrition.meals = meals;
            }
            Object.assign(nutrition, nutritionData);
            return yield NutritionRepo_1.nutritionRepository.save(nutrition);
        });
    }
    // Delete nutrition entry
    deleteNutrition(nutritionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const nutrition = yield NutritionRepo_1.nutritionRepository.findOne({ where: { id: nutritionId }, relations: ["meals"] });
            if (!nutrition) {
                throw new Error(`Nutrition record not found.`);
            }
            yield NutritionRepo_1.nutritionRepository.delete(nutritionId);
        });
    }
    // Get nutrition by ID
    getNutritionById(nutritionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NutritionRepo_1.nutritionRepository.findOne({ where: { id: nutritionId }, relations: ["meals", "user"] });
        });
    }
    // Get all nutrition data
    getAllNutrition() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NutritionRepo_1.nutritionRepository.find({ relations: ["meals", "user"] });
        });
    }
    // Get nutrition data for a user
    getUserNutrition(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NutritionRepo_1.nutritionRepository.find({ where: { user: { id: userId } }, relations: ["meals", "user"] });
        });
    }
    // Calculate total daily nutrition for a user
    calculateDailyNutrition(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepo_1.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error(`User with ID ${userId} not found.`);
            }
            const meals = yield mealRepo_1.mealRepository.find({ where: { users: { id: userId } } });
            if (!meals.length) {
                return null;
            }
            const dailyCalories = meals.reduce((total, meal) => total + (meal.calories || 0), 0);
            const dailyProtein = meals.reduce((total, meal) => total + (meal.protein || 0), 0);
            const dailyCarbs = meals.reduce((total, meal) => total + (meal.carbs || 0), 0);
            const dailyFats = meals.reduce((total, meal) => total + (meal.fats || 0), 0);
            const nutrition = NutritionRepo_1.nutritionRepository.create({
                dailyCalories,
                dailyProtein,
                dailyCarbs,
                dailyFats,
                user,
            });
            return yield NutritionRepo_1.nutritionRepository.save(nutrition);
        });
    }
}
exports.NutritionService = NutritionService;
