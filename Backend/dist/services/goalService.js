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
exports.goalService = void 0;
const GoalRepo_1 = require("../repositories/GoalRepo");
const WorkoutRepo_1 = require("../repositories/WorkoutRepo");
class goalService {
    createGoal(userId, goalData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!goalData.name || !goalData.target || !goalData.requiredWorkoutTypes) {
                throw new Error("Missing required fields: name, target, or workout types");
            }
            const workouts = [];
            for (const type of goalData.requiredWorkoutTypes) {
                let workout = yield WorkoutRepo_1.workoutRepository.findOne({ where: { type, user: { id: userId } } });
                if (!workout) {
                    workout = WorkoutRepo_1.workoutRepository.create({
                        type,
                        duration: 0,
                        date: new Date(),
                        completed: false,
                        caloriesBurned: 0,
                        user: { id: userId }
                    });
                    workout = yield WorkoutRepo_1.workoutRepository.save(workout);
                }
                workouts.push(workout);
            }
            const newGoal = GoalRepo_1.goalRepository.create({
                goalType: goalData.name,
                target: goalData.target,
                createdAt: new Date(),
                deadline: goalData.deadline || null,
                requiredWorkouts: workouts.length,
                completedWorkouts: 0,
                progress: 0,
                achieved: false,
                user: { id: userId },
                workouts: workouts
            });
            return yield GoalRepo_1.goalRepository.save(newGoal);
        });
    }
    updateProgress(goalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = yield GoalRepo_1.goalRepository.findOne({
                where: { id: goalId },
                relations: ["workouts"]
            });
            if (!goal) {
                throw new Error(`Goal with id ${goalId} not found`);
            }
            const completedWorkouts = goal.workouts.filter(workout => workout.completed).length;
            goal.completedWorkouts = completedWorkouts;
            goal.progress = Math.round((completedWorkouts / goal.requiredWorkouts) * 100);
            if (goal.progress === 100) {
                goal.achieved = true;
            }
            return yield GoalRepo_1.goalRepository.save(goal);
        });
    }
    getGoals(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const goals = yield GoalRepo_1.goalRepository.find({
                where: { user: { id: userId } },
                relations: ["workouts"]
            });
            return goals;
        });
    }
    deleteGoal(goalId) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = yield GoalRepo_1.goalRepository.findOneBy({ id: goalId });
            if (!goal) {
                return false;
            }
            yield GoalRepo_1.goalRepository.delete(goalId);
            return true;
        });
    }
}
exports.goalService = goalService;
// import { GoalDTO } from "../dto/goalDTO";
// import { Goal } from "../entities/Goal";
// import { Workout } from "../entities/Workout";
// import { goalRepository } from "../repositories/GoalRepo";
// import { workoutRepository } from "../repositories/WorkoutRepo";
// export class goalService {
//     // Create a new goal and associate workouts
//     async createGoal(userId: number, goalData: GoalDTO): Promise<Goal> {
//         // Validate the input data
//         if (!userId || !goalData.name || !goalData.target || !goalData.workoutIds) {
//             throw new Error("Missing required fields: userId, name, target, or workoutIds");
//         }
//         // Fetch workouts to associate with the goal
//         const workouts = await workoutRepository.findByIds(goalData.workoutIds);
//         // Create a new goal entity using the provided data
//         const newGoal = goalRepository.create({
//             goalType: goalData.name,
//             target: `${goalData.target}`, // Convert target to a string
//             deadline: goalData.deadline || null,
//             progress: 0,
//             createdAt: new Date(),
//             requiredWorkouts: workouts.length,
//             completedWorkouts: 0,
//             user: { id: userId }, // Assuming user relation is set by id
//             workouts: workouts // Associate the selected workouts
//         });
//         // Save the new goal to the database
//         const savedGoal = await goalRepository.save(newGoal);
//         return savedGoal;
//     }
//     // Update progress when a workout is completed
//     async updateProgress(goalId: number): Promise<Goal> {
//         // Find the goal with associated workouts
//         const goal = await goalRepository.findOne({
//             where: { id: goalId },
//             relations: ["workouts"]
//         });
//         if (!goal) {
//             throw new Error(`Goal with id ${goalId} not found`);
//         }
//         // Calculate the number of completed workouts
//         const completedWorkouts = goal.workouts.filter(workout => workout.caloriesBurned > 0).length; // Assuming completed workouts have calories burned
//         // Update progress percentage
//         console.log(goal.progress);
//         goal.completedWorkouts = completedWorkouts;
//         goal.progress = Math.floor((completedWorkouts / goal.requiredWorkouts) * 100);
//         // Mark the goal as achieved if progress reaches 100%
//         if (goal.progress === 100) {
//             goal.achieved = true;
//         }
//         // Save the updated goal
//         const updatedGoal = await goalRepository.save(goal);
//         return updatedGoal;
//     }
//     // Fetch goals for a specific user
//     async getGoals(userId: number): Promise<Goal[]> {
//         const goals = await goalRepository.find({
//             where: { user: { id: userId } },
//             relations: ["workouts"]
//         });
//         return goals;
//     }
//     // Delete a goal
//     async deleteGoal(goalId: number): Promise<boolean> {
//         const goal = await goalRepository.findOneBy({ id: goalId });
//         if (!goal) {
//             return false;
//         }
//         await goalRepository.delete(goalId);
//         return true;
//     }
//     async calculateProgress(goalId: number): Promise<void> {
//         const goal = await goalRepository.findOne({
//             where: { id: goalId },
//             relations: ["workouts"]
//         });
//         if (!goal) {
//             throw new Error(`Goal with id ${goalId} not found`);
//         }
//         const totalWorkouts = goal.workouts.length;
//         const completedWorkouts = goal.workouts.filter(workout => workout.completed).length;
//         goal.progress = Math.round((completedWorkouts / totalWorkouts) * 100);
//         // Mark as achieved if progress reaches 100%
//         goal.achieved = goal.progress === 100;
//         await goalRepository.save(goal);
//     }
// }
// // import { GoalDTO } from "../dto/goalDTO";
// // import { Goal } from "../entities/Goal";
// // import { goalRepository } from "../repositories/GoalRepo";
// // export class goalService {
// //     // Create a new goal for a specific user
// //     async createGoal(userId: number, goalData: GoalDTO): Promise<Goal> {
// //         // Validate the input data
// //         if (!userId || !goalData.name || !goalData.target) {
// //             throw new Error("Missing required fields: userId, name, or target");
// //         }
// //         // Create a new goal entity using the provided data
// //         const newGoal = goalRepository.create({
// //             goalType: goalData.name,
// //             target: `${goalData.target}`, // Convert target to a string
// //             deadline: goalData.deadline || null,
// //             progress: goalData.progress || 0,
// //             createdAt: new Date(),
// //             user: { id: userId } // Assuming user relation is set by id
// //         });
// //         // Save the new goal to the database
// //         const savedGoal = await goalRepository.save(newGoal);
// //         // Return the saved goal entity
// //         return savedGoal;
// //     }
// //     // Get all goals for a specific user
// //     async getGoals(userId: number): Promise<Goal[]> {
// //         const goals = await goalRepository.find({
// //             where: { user: { id: userId } },
// //         });
// //         return goals;
// //     }
// //     // Update progress or mark goal as achieved
// //     async updateGoal(goalId: number, progress: number, achieved: boolean): Promise<Goal> {
// //         const goal = await goalRepository.findOneBy({ id: goalId });
// //         if (!goal) {
// //             throw new Error(`Goal with id ${goalId} not found`);
// //         }
// //         goal.progress = progress;
// //         goal.achieved = achieved;
// //         const updatedGoal = await goalRepository.save(goal);
// //         return updatedGoal;
// //     }
// //     async deleteGoal(goalId: number): Promise<boolean> {
// //         const goal = await goalRepository.findOneBy({ id: goalId });
// //         if (!goal) {
// //             // throw new Error(`Goal with id ${goalId} not found`);
// //             return false;
// //         }
// //         await goalRepository.delete(goalId);
// //         return true;
// //     }
// // }
