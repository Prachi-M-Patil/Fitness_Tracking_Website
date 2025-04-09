import { Activity } from "../entities/Activity";
import { activityRepository } from "../repositories/ActivityRepo";

export class ActivityService {
    async addActivity(activityData: Partial<Activity>): Promise<Activity> {
        const activity = activityRepository.create(activityData);
        return await activityRepository.save(activity);
    }

    async updateActivity(activityId: number, activityData: Partial<Activity>): Promise<Activity | null> {
        const activity = await activityRepository.findOne({ where: { id: activityId } });

        if (!activity) {
            return null;
        }

        Object.assign(activity, activityData);
        const updatedActivity = await activityRepository.save(activity);
        return updatedActivity;
    }

    async deleteActivity(activityId: number): Promise<void> {
        await activityRepository.delete(activityId);
    }

    async getActivityById(activityId: number): Promise<Activity | null> {
        return await activityRepository.findOne({ where: { id: activityId }, relations: ["user"] });
    }

    async getAllActivities(): Promise<Activity[]> {
        return await activityRepository.find({ relations: ["user"] });
    }

    async getUserActivities(userId: number): Promise<Activity[]> {
        return await activityRepository.find({ where: { user: { id: userId } }, relations: ["user"] });
    }
}
