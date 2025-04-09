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
exports.AdminDashboardService = void 0;
const UserRepo_1 = require("../repositories/UserRepo");
const WorkoutRepo_1 = require("../repositories/WorkoutRepo");
const GoalRepo_1 = require("../repositories/GoalRepo");
const mealRepo_1 = require("../repositories/mealRepo");
class AdminDashboardService {
    // Add a new user
    addUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = UserRepo_1.userRepository.create(userData);
            return yield UserRepo_1.userRepository.save(user);
        });
    }
    // Deactivate a user
    deactivateUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepo_1.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw { status: 404, message: `User with ID ${userId} not found.` };
            }
            user.active = false; // Mark user as deactivated
            yield UserRepo_1.userRepository.save(user);
        });
    }
    //activate user
    activateUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepo_1.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw { status: 404, message: `User with ID ${userId} not found.` };
            }
            user.active = true; // Mark user as activated
            yield UserRepo_1.userRepository.save(user);
        });
    }
    // Update user details
    updateUser(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepo_1.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                return null;
            }
            // Update the existing user with only provided fields
            Object.assign(user, userData);
            // Save the updated user to the database
            const updatedUser = yield UserRepo_1.userRepository.save(user);
            // Return the updated user
            return updatedUser;
        });
    }
    // Search users by different fields
    // async searchUsers(query: Partial<User>): Promise<User[]> {
    //     return await userRepository.find({ where: query });
    // }
    searchUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereClause = {};
            if (query.id)
                whereClause.id = query.id;
            if (query.username)
                whereClause.username = query.username;
            if (query.email)
                whereClause.email = query.email;
            // if (query.workouts) whereClause.workouts = { id: query.workouts.map(workout => workout.id) };
            // if (query.goals) whereClause.workouts= { id: query.goals.map(goal => goal.id) };
            return yield UserRepo_1.userRepository.find({ where: whereClause });
        });
    }
    // Get user's workouts
    getUserWorkouts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield WorkoutRepo_1.workoutRepository.find({ where: { user: { id: userId } } });
        });
    }
    // Get user's goals
    getUserGoals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield GoalRepo_1.goalRepository.find({ where: { user: { id: userId } } });
        });
    }
    // Get user's activities
    // async getUserActivities(userId: number): Promise<Activity[]> {
    //     return await activityRepository.find({ where: { user: { id: userId } } });
    // }
    // Get user's meals
    getUserMeals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mealRepo_1.mealRepository.find({ where: { users: { id: userId } }, relations: ["users"] });
        });
    }
    // Get user's liked meals
    getUserLikedMeals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserRepo_1.userRepository.findOne({ where: { id: userId }, relations: ["meals"] });
            if (!user) {
                throw { status: 404, message: `User with ID ${userId} not found.` };
            }
            return user.meals.filter(meal => meal.liked); // Assuming 'liked' is a field in Meal entity
        });
    }
    // Get list of deactivated users
    getDeactivatedUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepo_1.userRepository.find({ where: { active: false } });
        });
    }
}
exports.AdminDashboardService = AdminDashboardService;
