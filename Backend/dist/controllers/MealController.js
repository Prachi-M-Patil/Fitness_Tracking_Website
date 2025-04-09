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
exports.MealController = void 0;
const errorhandler_1 = require("../utils/errorhandler");
class MealController {
    constructor(mealService, nutritionService) {
        this.nutritionService = nutritionService;
        this.mealService = mealService;
        this.nutritionService = nutritionService;
    }
    // Add a new meal
    addMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // throw new Error('you dont have permission to add meals');
            try {
                const meal = yield this.mealService.addMeal(req.body);
                res.status(201).json(meal);
            }
            catch (error) {
                // res.status(500).json({ message: error.message });
                console.log("global error handler");
                throw new errorhandler_1.CustomError('you dont have permission to add meals', 400);
                // This will be caught by your error handler middleware
            }
        });
    }
    // Update an existing meal
    updateMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealId = parseInt(req.params.id, 10);
                const updatedMeal = yield this.mealService.updateMeal(mealId, req.body);
                if (!updatedMeal) {
                    res.status(404).json({ message: "Meal not found." });
                }
                else {
                    res.status(200).json(updatedMeal);
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Delete a meal
    deleteMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealId = parseInt(req.params.id, 10);
                yield this.mealService.deleteMeal(mealId);
                res.status(200).json({ message: "Meal deleted successfully." });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Fetch a specific meal by ID
    getMealById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealId = parseInt(req.params.id, 10);
                const meal = yield this.mealService.getMealById(mealId);
                if (!meal) {
                    res.status(404).json({ message: "Meal not found." });
                }
                else {
                    res.status(200).json(meal);
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Fetch all meals
    getAllMeals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("fetching meals");
                const meals = yield this.mealService.getAllMeals();
                res.status(200).json(meals);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Fetch meals for a specific user
    getUserMeals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                const meals = yield this.mealService.getUserMeals(userId);
                if (!meals.length) {
                    res.status(404).json({ message: "No meals found for this user." });
                }
                else {
                    res.status(200).json(meals);
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Fetch liked meals for a specific user
    getUserLikedMeals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                const likedMeals = yield this.mealService.getUserLikedMeals(userId);
                if (!likedMeals.length) {
                    res.status(404).json({ message: "No liked meals found for this user." });
                }
                else {
                    res.status(200).json(likedMeals);
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Log nutrition for a meal
    logMealNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealId = parseInt(req.params.mealId, 10);
                const nutrition = yield this.mealService.logMealNutrition(mealId, req.body);
                res.status(200).json(nutrition);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Toggle like/dislike for a meal
    toggleMealLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealId = parseInt(req.params.mealId, 10);
                const userId = parseInt(req.body.userId, 10);
                const updatedMeal = yield this.mealService.toggleMealLike(mealId, userId);
                res.status(200).json(updatedMeal);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Buy a meal
    buyMeal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealId = parseInt(req.params.mealId, 10);
                const userId = parseInt(req.body.userId, 10);
                const message = yield this.mealService.buyMeal(mealId, userId);
                res.status(200).json({ message });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.MealController = MealController;
