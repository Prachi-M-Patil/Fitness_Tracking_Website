"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MealController_1 = require("../controllers/MealController");
const MealService_1 = require("../services/MealService");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const nutritionService_1 = require("../services/nutritionService");
const router = (0, express_1.Router)();
const mealService = new MealService_1.MealService();
const nutritionService = new nutritionService_1.NutritionService(); // Required for nutrition-related functionalities
const mealController = new MealController_1.MealController(mealService, nutritionService); // Include NutritionService for extended methods
// Existing routes for meal CRUD operations
router.post('/', (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => mealController.addMeal(req, res)); // Add meal
router.put('/:id', (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => mealController.updateMeal(req, res)); // Update meal
router.delete('/:id', (0, authMiddleware_1.authMiddleware)(['admin']), (req, res) => mealController.deleteMeal(req, res)); // Delete meal
router.get('/:id', (0, authMiddleware_1.authMiddleware)(['admin', 'user']), (req, res) => mealController.getMealById(req, res)); // Get meal by ID
router.get('/', (0, authMiddleware_1.authMiddleware)(['admin', 'user']), (req, res) => mealController.getAllMeals(req, res)); // Get all meals
router.get('/user/:userId', (0, authMiddleware_1.authMiddleware)(['admin', 'user']), (req, res) => mealController.getUserMeals(req, res)); // Get meals for a specific user
router.get('/user/:userId/liked', (0, authMiddleware_1.authMiddleware)(['admin', 'user']), (req, res) => mealController.getUserLikedMeals(req, res)); // Get user's liked meals
// Additional routes for nutrition and extended meal functionalities
router.post('/log-nutrition/:mealId', (0, authMiddleware_1.authMiddleware)(['admin', 'user']), (req, res) => mealController.logMealNutrition(req, res)); // Log nutrition for a meal
// Extended routes for likes and purchase functionalities
router.post('/:mealId/toggle-like', (0, authMiddleware_1.authMiddleware)(['user', 'admin']), (req, res) => mealController.toggleMealLike(req, res)); // Toggle like/dislike for a meal
router.post('/:mealId/buy', (0, authMiddleware_1.authMiddleware)(['user', 'admin']), (req, res) => mealController.buyMeal(req, res)); // Purchase a meal
exports.default = router;
// import { Router } from 'express';
// import { MealController } from '../controllers/MealController';
// import { MealService } from '../services/MealService';
// import { authMiddleware } from '../middlewares/authMiddleware';
// import { NutritionService } from '../services/nutritionService';
// const router = Router();
// const mealService = new MealService();
// const nutritionService = new NutritionService(); // Required for additional functionality
// const mealController = new MealController(mealService, nutritionService); // Include NutritionService for added methods
// // Existing routes (unchanged)
// router.post('/', authMiddleware(['admin']), (req, res) => mealController.addMeal(req, res));
// router.put('/:id', authMiddleware(['admin']), (req, res) => mealController.updateMeal(req, res));
// router.delete('/:id', authMiddleware(['admin']), (req, res) => mealController.deleteMeal(req, res));
// router.get('/:id', authMiddleware(['admin', 'user']), (req, res) => mealController.getMealById(req, res));
// router.get('/', authMiddleware(['admin', 'user']), (req, res) => mealController.getAllMeals(req, res));
// router.get('/user/:userId', authMiddleware(['admin', 'user']), (req, res) => mealController.getUserMeals(req, res));
// router.get('/user/:userId/liked', authMiddleware(['admin', 'user']), (req, res) => mealController.getUserLikedMeals(req, res));
// // Additional routes
// router.post('/log-nutrition/:mealId', authMiddleware(['admin', 'user']), (req, res) => mealController.logMealNutrition(req, res)); // Log nutrition for a meal
// router.get('/nutrition/user/:userId/daily', authMiddleware(['admin', 'user']), (req, res) => mealController.calculateUserDailyNutrition(req, res)); // Calculate total daily nutrition for a user
// router.post('/:mealId/toggle-like', authMiddleware(['user', 'admin']), (req, res) => mealController.toggleMealLike(req, res)); // Route to toggle like/dislike a meal
// export default router;
