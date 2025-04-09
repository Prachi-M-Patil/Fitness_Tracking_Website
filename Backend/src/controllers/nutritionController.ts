import { Request, Response } from 'express';
import { Nutrition } from '../entities/Nutrition';
import { NutritionService } from '../services/nutritionService';

export class NutritionController {
    private nutritionService: NutritionService;

    constructor(nutritionService: NutritionService) {
        this.nutritionService = nutritionService;
    }

    // Add a new nutrition record
    async addNutrition(req: Request, res: Response): Promise<void> {
        try {
            const nutritionData: Partial<Nutrition> = req.body;
            const nutrition = await this.nutritionService.addNutrition(nutritionData);
            res.status(201).json(nutrition);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Update an existing nutrition record
    async updateNutrition(req: Request, res: Response): Promise<void> {
        try {
            const nutritionId = parseInt(req.params.id, 10);
            const nutritionData: Partial<Nutrition> = req.body;

            const updatedNutrition = await this.nutritionService.updateNutrition(nutritionId, nutritionData);

            if (!updatedNutrition) {
                res.status(404).json({ message: 'Nutrition record not found.' });
            } else {
                res.status(200).json(updatedNutrition);
            }
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Delete a nutrition record
    async deleteNutrition(req: Request, res: Response): Promise<void> {
        try {
            const nutritionId = parseInt(req.params.id, 10);
            await this.nutritionService.deleteNutrition(nutritionId);
            res.status(200).json({ message: 'Nutrition record deleted successfully.' });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Get nutrition record by ID
    async getNutritionById(req: Request, res: Response): Promise<void> {
        try {
            const nutritionId = parseInt(req.params.id, 10);
            const nutrition = await this.nutritionService.getNutritionById(nutritionId);

            if (!nutrition) {
                res.status(404).json({ message: 'Nutrition record not found.' });
            } else {
                res.status(200).json(nutrition);
            }
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Get all nutrition records
    async getAllNutrition(req: Request, res: Response): Promise<void> {
        try {
            const nutrition = await this.nutritionService.getAllNutrition();
            res.status(200).json(nutrition);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Get user-specific nutrition records
    async getUserNutrition(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const nutrition = await this.nutritionService.getUserNutrition(userId);

            if (!nutrition || nutrition.length === 0) {
                res.status(404).json({ message: 'No nutrition data found for the user.' });
            } else {
                res.status(200).json(nutrition);
            }
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Calculate total daily nutrition for a user
    async calculateUserDailyNutrition(req: Request, res: Response): Promise<void> {
        try {
            console.log("try block");
            const userId = parseInt(req.params.userId, 10);
            console.log("userid", userId);
            const dailyNutrition = await this.nutritionService.calculateDailyNutrition(userId);
            console.log("daily nutrtion",dailyNutrition);
    
            if (!dailyNutrition) {
                res.status(404).json({ message: 'No meals found for the user to calculate daily nutrition.' });
            } else {
                res.status(200).json(dailyNutrition);
            }
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
        
    }
}
