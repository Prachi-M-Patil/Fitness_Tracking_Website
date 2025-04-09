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
exports.WorkoutController = void 0;
const workoutService_1 = require("../services/workoutService");
class WorkoutController {
    constructor() {
        this.workoutService = new workoutService_1.WorkoutService();
    }
    // Log a new workout
    logWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, workoutData } = req.body;
                if (!userId || !workoutData || !workoutData.type || !workoutData.duration) {
                    res.status(400).json({ error: "Missing required fields: userId, type, or duration" });
                    return;
                }
                const newWorkout = yield this.workoutService.logWorkout(userId, workoutData);
                res.status(201).json(newWorkout);
            }
            catch (error) {
                console.error("Error in logWorkout:", error);
                res.status(500).json({ error: "Failed to log a new workout" });
            }
        });
    }
    // Get all workouts for a specific user
    getWorkouts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.query.userId);
                if (!userId || isNaN(userId)) {
                    res.status(400).json({ error: "Invalid or missing userId" });
                    return;
                }
                const workouts = yield this.workoutService.getWorkouts(userId);
                res.status(200).json(workouts);
            }
            catch (error) {
                console.error("Error in getWorkouts:", error);
                res.status(500).json({ error: "Failed to retrieve workouts" });
            }
        });
    }
    // Delete a workout
    deleteWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workoutId = parseInt(req.params.workoutId);
                if (!workoutId || isNaN(workoutId)) {
                    res.status(400).json({ error: "Invalid or missing workoutId in request parameters" });
                    return;
                }
                yield this.workoutService.deleteWorkout(workoutId);
                res.status(200).json({ message: "Workout successfully deleted" });
            }
            catch (error) {
                console.error("Error in deleteWorkout:", error);
                res.status(500).json({ error: "Failed to delete workout" });
            }
        });
    }
    completeWorkout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { workoutId } = req.body;
                if (!workoutId || isNaN(workoutId)) {
                    res.status(400).json({ error: "Invalid or missing workoutId" });
                    return;
                }
                yield this.workoutService.completeWorkout(workoutId);
                res.status(200).json({ message: "Workout marked as completed" });
            }
            catch (error) {
                console.error("Error in completeWorkout:", error);
                res.status(500).json({ error: "Failed to mark workout as completed" });
            }
        });
    }
}
exports.WorkoutController = WorkoutController;
// import { workoutDTO } from "../dto/workoutDTO";
// import { Workout } from "../entities/Workout";
// import { WorkoutService } from "../services/workoutService";
// import { Request, Response } from "express";
// export class workoutController{
//     private workoutService: WorkoutService;
//     constructor(){
//         this.workoutService = new WorkoutService();
//     }
//     async logWorkout(req: Request, res: Response): Promise<void> {
//         try {
//             const {userId , workoutData}=req.body;
//             const newWorkout = await this.workoutService.logWorkout(userId, workoutData);
//             res.status(201).json(newWorkout);
//         } catch (error) {
//             res.status(500).json({ error: "Failed to log workout"});
//         }
//     }
//     async getWorkouts(req: Request, res: Response): Promise<void> {
//         try {
//             const { userId } = req.body; // Take userId from request body
//             // Validate userId
//             if (!userId || isNaN(userId)) {
//                 res.status(400).json({ error: "Invalid or missing userId in request body" });
//                 return;
//             }
//             const workouts = await this.workoutService.getWorkouts(userId);
//             // If no workouts are found, return a 404 response
//             if (workouts.length === 0) {
//                 res.status(404).json({ error: "No workouts found for the specified user" });
//                 return;
//             }
//             res.status(200).json(workouts);
//         } catch (error) {
//             console.error("Error in getWorkouts:", error);
//             res.status(500).json({ error: "Failed to retrieve workouts" });
//         }
//     }
//     async editWorkout(req: Request, res: Response):Promise<void> {
//                  try{
//                     const userId = parseInt(req.params.userId);
//                     const workoutData : Partial<Workout> = req.body;
//                   const updatedWorkout = await this.workoutService.editWorkout(userId, workoutData);
//                   if (!updatedWorkout) {
//                       res.status(404).json({ message: "Workout not found." });
//                       return;
//                   }
//                   console.log("Workout updated");
//                   res.status(200).json(updatedWorkout);
//               } catch (error) {
//                   console.error("Error updating workout:", error); 
//                   res.status(500).json({ message: "An error occurred while updating the workout.", error });
//     }
// }
// }
