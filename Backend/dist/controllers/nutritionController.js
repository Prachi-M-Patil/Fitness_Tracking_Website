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
exports.NutritionController = void 0;
class NutritionController {
    constructor(nutritionService) {
        this.nutritionService = nutritionService;
    }
    // Add a new nutrition record
    addNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nutritionData = req.body;
                const nutrition = yield this.nutritionService.addNutrition(nutritionData);
                res.status(201).json(nutrition);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    // Update an existing nutrition record
    updateNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nutritionId = parseInt(req.params.id, 10);
                const nutritionData = req.body;
                const updatedNutrition = yield this.nutritionService.updateNutrition(nutritionId, nutritionData);
                if (!updatedNutrition) {
                    res.status(404).json({ message: 'Nutrition record not found.' });
                }
                else {
                    res.status(200).json(updatedNutrition);
                }
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    // Delete a nutrition record
    deleteNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nutritionId = parseInt(req.params.id, 10);
                yield this.nutritionService.deleteNutrition(nutritionId);
                res.status(200).json({ message: 'Nutrition record deleted successfully.' });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    // Get nutrition record by ID
    getNutritionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nutritionId = parseInt(req.params.id, 10);
                const nutrition = yield this.nutritionService.getNutritionById(nutritionId);
                if (!nutrition) {
                    res.status(404).json({ message: 'Nutrition record not found.' });
                }
                else {
                    res.status(200).json(nutrition);
                }
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    // Get all nutrition records
    getAllNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nutrition = yield this.nutritionService.getAllNutrition();
                res.status(200).json(nutrition);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    // Get user-specific nutrition records
    getUserNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                const nutrition = yield this.nutritionService.getUserNutrition(userId);
                if (!nutrition || nutrition.length === 0) {
                    res.status(404).json({ message: 'No nutrition data found for the user.' });
                }
                else {
                    res.status(200).json(nutrition);
                }
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    // Calculate total daily nutrition for a user
    calculateUserDailyNutrition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("try block");
                const userId = parseInt(req.params.userId, 10);
                console.log("userid", userId);
                const dailyNutrition = yield this.nutritionService.calculateDailyNutrition(userId);
                console.log("daily nutrtion", dailyNutrition);
                if (!dailyNutrition) {
                    res.status(404).json({ message: 'No meals found for the user to calculate daily nutrition.' });
                }
                else {
                    res.status(200).json(dailyNutrition);
                }
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
}
exports.NutritionController = NutritionController;
