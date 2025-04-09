import { Request, Response } from 'express';
import { AdminDashboardService } from '../services/AdminService';
import { User } from '../entities/User';
import { getRepository } from 'typeorm';

export class AdminDashboardController {
    private adminDashboardService: AdminDashboardService;

    constructor(adminDashboardService: AdminDashboardService) {
        this.adminDashboardService = adminDashboardService;
    }

    // Add a new user
    async addUser(req: Request, res: Response): Promise<void> {
        try {
            const userData: Partial<User> = req.body;
            const user = await this.adminDashboardService.addUser(userData);
            res.status(201).json(user);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Deactivate a user
    async deactivateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            await this.adminDashboardService.deactivateUser(userId);
            res.status(200).json({ message: 'User deactivated successfully' });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Update user details
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const userData: Partial<User> = req.body;
            const user = await this.adminDashboardService.updateUser(userId, userData);
            res.status(200).json(user);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Search users by different fields
    async searchUsers(req: Request, res: Response): Promise<void> {
        try {
            const query: Partial<User> = req.query;
            const users = await this.adminDashboardService.searchUsers(query);
            res.status(200).json(users);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Get user's workouts
    async getUserWorkouts(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const workouts = await this.adminDashboardService.getUserWorkouts(userId);
            res.status(200).json(workouts);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Get user's goals
    async getUserGoals(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const goals = await this.adminDashboardService.getUserGoals(userId);
            res.status(200).json(goals);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Get user's activities
    // async getUserActivities(req: Request, res: Response): Promise<void> {
    //     try {
    //         const userId = parseInt(req.params.userId, 10);
    //         const activities = await this.adminDashboardService.getUserActivities(userId);
    //         res.status(200).json(activities);
    //     } catch (error) {
    //         res.status(error.status || 500).json({ message: error.message });
    //     }
    // }

    // Get user's meals
    async getUserMeals(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const meals = await this.adminDashboardService.getUserMeals(userId);
            res.status(200).json(meals);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Get user's liked meals
    async getUserLikedMeals(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const meals = await this.adminDashboardService.getUserLikedMeals(userId);
            res.status(200).json(meals);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    // Get list of deactivated users
    async getDeactivatedUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.adminDashboardService.getDeactivatedUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    //activate user
    async activateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            await this.adminDashboardService.activateUser(userId);
            res.status(200).json({ message: 'User activated successfully' });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }


    
}
