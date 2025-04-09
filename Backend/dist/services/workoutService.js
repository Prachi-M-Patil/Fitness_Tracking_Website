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
exports.WorkoutService = void 0;
const GoalRepo_1 = require("../repositories/GoalRepo");
const WorkoutRepo_1 = require("../repositories/WorkoutRepo");
const goalService_1 = require("./goalService");
class WorkoutService {
    constructor() {
        this.goalService = new goalService_1.goalService();
    }
    // Log a workout and update goal progress
    logWorkout(userId, workoutData) {
        return __awaiter(this, void 0, void 0, function* () {
            const workoutToCreate = {
                type: workoutData.type,
                duration: workoutData.duration,
                date: workoutData.date,
                caloriesBurned: workoutData.caloriesBurned,
                user: { id: userId }
            };
            const workout = yield WorkoutRepo_1.workoutRepository.create(workoutToCreate);
            const savedWorkout = yield WorkoutRepo_1.workoutRepository.save(workout); // Ensure this is a single entity.
            // If savedWorkout might be an array, handle it here:
            if (Array.isArray(savedWorkout)) {
                throw new Error("workoutRepository.save unexpectedly returned an array");
            }
            // Update goal progress for associated goals
            if (workoutData.goalIds && workoutData.goalIds.length > 0) {
                for (const goalId of workoutData.goalIds) {
                    try {
                        yield this.goalService.updateProgress(goalId);
                    }
                    catch (error) {
                        console.error(`Error updating goal progress for goal ${goalId}:`, error);
                    }
                }
            }
            return savedWorkout;
        });
    }
    getWorkouts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const workouts = yield WorkoutRepo_1.workoutRepository.find({
                where: { user: { id: userId } },
                relations: ["user"]
            });
            return workouts;
        });
    }
    deleteWorkout(workoutId) {
        return __awaiter(this, void 0, void 0, function* () {
            const workout = yield WorkoutRepo_1.workoutRepository.findOne({
                where: { id: workoutId },
                relations: ["goals"]
            });
            if (!workout) {
                throw new Error(`Workout with id ${workoutId} not found`);
            }
            // Delete the workout
            yield WorkoutRepo_1.workoutRepository.delete(workoutId);
            // Update progress for associated goals
            if (workout.goals) {
                for (const goal of workout.goals) {
                    yield this.goalService.updateProgress(goal.id);
                }
            }
        });
    }
    completeWorkout(workoutId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch the workout
            const workout = yield WorkoutRepo_1.workoutRepository.findOne({
                where: { id: workoutId },
                relations: ["goals"]
            });
            if (!workout) {
                throw new Error(`Workout with id ${workoutId} not found`);
            }
            // Mark the workout as completed
            workout.completed = true;
            yield WorkoutRepo_1.workoutRepository.save(workout);
            // Update progress for associated goals
            if (workout.goals) {
                for (const goal of workout.goals) {
                    yield this.updateGoalProgress(goal.id);
                }
            }
        });
    }
    updateGoalProgress(goalId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch the goal with associated workouts
            const goal = yield GoalRepo_1.goalRepository.findOne({
                where: { id: goalId },
                relations: ["workouts"]
            });
            if (!goal) {
                throw new Error(`Goal with id ${goalId} not found`);
            }
            // Calculate progress based on completed workouts
            const totalWorkouts = goal.workouts.length;
            const completedWorkouts = goal.workouts.filter(workout => workout.completed).length;
            goal.progress = Math.round((completedWorkouts / totalWorkouts) * 100);
            // If progress reaches 100%, mark the goal as achieved
            goal.achieved = goal.progress === 100;
            // Save the updated goal
            yield GoalRepo_1.goalRepository.save(goal);
        });
    }
}
exports.WorkoutService = WorkoutService;
// import { workoutDTO } from "../dto/workoutDTO";
// import { Workout } from "../entities/Workout";
// import { workoutRepository } from "../repositories/WorkoutRepo";
// export class WorkoutService{
//     async logWorkout(userId: number, workoutData: workoutDTO): Promise<Workout>{
//         const workout = await workoutRepository.create({...workoutData, user:{id: userId}});
//         return await workoutRepository.save(workout);
//     }
//     async getWorkouts(userId: number){
//         const workouts = await workoutRepository.find({
//             where: { user: { id: userId } },
//             relations: ["user"]
//         });
//         console.log(workouts); // debugging
//         return workouts.map(({ id, type, duration, date, caloriesBurned }) => ({
//             id,
//             type,
//             duration,
//             date,
//             caloriesBurned
//         }));
//     }
//     async deleteWorkout(workoutId: number): Promise<void> {
//         await workoutRepository.delete(workoutId);
//     }
//     async editWorkout(workoutId: number, workoutData:Partial<workoutDTO>): Promise<Workout>{
//         const { id, ...updateData } = workoutData;
//         await workoutRepository.update(workoutId, updateData);
//         return await workoutRepository.findOneBy({ id: workoutId });
//     }
//     async getAllWorkouts(): Promise<Workout[]> {
//         return await workoutRepository.find({ relations: ["user"] });
//     }
// }
