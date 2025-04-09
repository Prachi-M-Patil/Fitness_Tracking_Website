import { Request, Response } from 'express';
import { ActivityService } from '../services/activityService';
import { Activity } from '../entities/Activity';

export class ActivityController {
    private activityService: ActivityService;

    constructor(activityService: ActivityService) {
        this.activityService = activityService;
    }

    async addActivity(req: Request, res: Response): Promise<void> {
        try {
            const activityData: Partial<Activity> = req.body;
            const activity = await this.activityService.addActivity(activityData);
            res.status(201).json(activity);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async updateActivity(req: Request, res: Response): Promise<void> {
        try {
            const activityId = parseInt(req.params.id, 10);
            const activityData: Partial<Activity> = req.body;
            const activity = await this.activityService.updateActivity(activityId, activityData);
            res.status(200).json(activity);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async deleteActivity(req: Request, res: Response): Promise<void> {
        try {
            const activityId = parseInt(req.params.id, 10);
            await this.activityService.deleteActivity(activityId);
            res.status(200).json({ message: 'Activity deleted successfully' });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async getActivityById(req: Request, res: Response): Promise<void> {
        try {
            const activityId = parseInt(req.params.id, 10);
            const activity = await this.activityService.getActivityById(activityId);
            res.status(200).json(activity);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async getAllActivities(req: Request, res: Response): Promise<void> {
        try {
            const activities = await this.activityService.getAllActivities();
            res.status(200).json(activities);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }

    async getUserActivities(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId, 10);
            const activities = await this.activityService.getUserActivities(userId);
            res.status(200).json(activities);
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message });
        }
    }
}
