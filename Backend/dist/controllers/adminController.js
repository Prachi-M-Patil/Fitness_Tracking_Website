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
exports.AdminDashboardController = void 0;
class AdminDashboardController {
    constructor(adminDashboardService) {
        this.adminDashboardService = adminDashboardService;
    }
    // Add a new user
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const user = yield this.adminDashboardService.addUser(userData);
                res.status(201).json(user);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    // Deactivate a user
    deactivateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                yield this.adminDashboardService.deactivateUser(userId);
                res.status(200).json({ message: 'User deactivated successfully' });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    // Update user details
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                const userData = req.body;
                const user = yield this.adminDashboardService.updateUser(userId, userData);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    // Search users by different fields
    searchUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                const users = yield this.adminDashboardService.searchUsers(query);
                res.status(200).json(users);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    // Get user's workouts
    getUserWorkouts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                const workouts = yield this.adminDashboardService.getUserWorkouts(userId);
                res.status(200).json(workouts);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    // Get user's goals
    getUserGoals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                const goals = yield this.adminDashboardService.getUserGoals(userId);
                res.status(200).json(goals);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
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
    getUserMeals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                const meals = yield this.adminDashboardService.getUserMeals(userId);
                res.status(200).json(meals);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    // Get user's liked meals
    getUserLikedMeals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                const meals = yield this.adminDashboardService.getUserLikedMeals(userId);
                res.status(200).json(meals);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    // Get list of deactivated users
    getDeactivatedUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.adminDashboardService.getDeactivatedUsers();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    //activate user
    activateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                yield this.adminDashboardService.activateUser(userId);
                res.status(200).json({ message: 'User activated successfully' });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
}
exports.AdminDashboardController = AdminDashboardController;
