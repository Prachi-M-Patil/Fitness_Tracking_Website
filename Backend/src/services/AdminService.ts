import { User } from "../entities/User";
import { Workout } from "../entities/Workout";
import { Goal } from "../entities/Goal";
import { Activity } from "../entities/Activity";
import { Meal } from "../entities/Meal";
import { userRepository } from "../repositories/UserRepo";
import { workoutRepository } from "../repositories/WorkoutRepo";
import { goalRepository } from "../repositories/GoalRepo";
import { mealRepository } from "../repositories/mealRepo";
import { FindOptionsWhere } from "typeorm";

export class AdminDashboardService {
    // Add a new user
    async addUser(userData: Partial<User>): Promise<User> {
        const user = userRepository.create(userData);
        return await userRepository.save(user);
    }

    // Deactivate a user
    async deactivateUser(userId: number): Promise<void> {
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw { status: 404, message: `User with ID ${userId} not found.` };
        }
        user.active = false; // Mark user as deactivated
        await userRepository.save(user);
    }

    //activate user
    async activateUser(userId: number): Promise<void> {
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw { status: 404, message: `User with ID ${userId} not found.` };
        }
        user.active = true; // Mark user as activated
        await userRepository.save(user);
    }

    // Update user details
    
    async updateUser(userId: number, userData: Partial<User>): Promise<User | null> {
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
            return null; 
        }

        // Update the existing user with only provided fields
        Object.assign(user, userData);

        // Save the updated user to the database
        const updatedUser = await userRepository.save(user);

        // Return the updated user
        return updatedUser;
    }

    // Search users by different fields
    // async searchUsers(query: Partial<User>): Promise<User[]> {
    //     return await userRepository.find({ where: query });
    // }
    async searchUsers(query: Partial<User>): Promise<User[]> {
        const whereClause: FindOptionsWhere<User> = {};

        if (query.id) whereClause.id = query.id;
        if (query.username) whereClause.username = query.username;
        if (query.email) whereClause.email = query.email;
        // if (query.workouts) whereClause.workouts = { id: query.workouts.map(workout => workout.id) };
        // if (query.goals) whereClause.workouts= { id: query.goals.map(goal => goal.id) };
        return await userRepository.find({ where: whereClause });
    }



    // Get user's workouts
    async getUserWorkouts(userId: number): Promise<Workout[]> {
        return await workoutRepository.find({ where: { user: { id: userId } } });
    }

    // Get user's goals
    async getUserGoals(userId: number): Promise<Goal[]> {
        return await goalRepository.find({ where: { user: { id: userId } } });
    }

    // Get user's activities
    // async getUserActivities(userId: number): Promise<Activity[]> {
    //     return await activityRepository.find({ where: { user: { id: userId } } });
    // }

    // Get user's meals
    async getUserMeals(userId: number): Promise<Meal[]> {
        return await mealRepository.find({ where: { users: { id: userId } }, relations: ["users"] });
    }

    // Get user's liked meals
    async getUserLikedMeals(userId: number): Promise<Meal[]> {
        const user = await userRepository.findOne({ where: { id: userId }, relations: ["meals"] });
        if (!user) {
            throw { status: 404, message: `User with ID ${userId} not found.` };
        }
        return user.meals.filter(meal => meal.liked); // Assuming 'liked' is a field in Meal entity
    }

    // Get list of deactivated users
    async getDeactivatedUsers(): Promise<User[]> {
        return await userRepository.find({ where: { active: false } });
    }

}
