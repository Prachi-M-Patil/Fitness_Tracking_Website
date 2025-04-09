import { Request, Response } from "express";
import { goalService } from "../services/goalService";
import { GoalDTO } from "../dto/goalDTO";

export class GoalController {
    private goalService: goalService;

    constructor() {
        this.goalService = new goalService();
    }

    // Create a new goal
    async createGoal(req: Request, res: Response): Promise<void> {
        try {
            const { userId, goalData }: { userId: number; goalData: GoalDTO } = req.body;

            if (!userId || !goalData || !goalData.name || !goalData.target || !goalData.workoutIds) {
                res.status(400).json({ error: "Missing required fields: userId, name, target, or workoutIds" });
                return;
            }

            const newGoal = await this.goalService.createGoal(userId, goalData);
            res.status(201).json(newGoal);
        } catch (error) {
            console.error("Error in createGoal:", error);
            res.status(500).json({ error: "Failed to create a new goal" });
        }
    }

    // Get all goals for a specific user
    async getGoals(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.query.userId as string);

            if (!userId || isNaN(userId)) {
                res.status(400).json({ error: "Invalid or missing userId in request query" });
                return;
            }

            const goals = await this.goalService.getGoals(userId);

            if (goals.length === 0) {
                res.status(404).json({ error: "No goals found for the specified user" });
                return;
            }

            res.status(200).json(goals);
        } catch (error) {
            console.error("Error in getGoals:", error);
            res.status(500).json({ error: "Failed to retrieve goals" });
        }
    }

    // Update goal progress
    async updateProgress(req: Request, res: Response): Promise<void> {
        try {
            const { goalId }: { goalId: number } = req.body;

            if (!goalId || isNaN(goalId)) {
                res.status(400).json({ error: "Invalid or missing goalId" });
                return;
            }

            const updatedGoal = await this.goalService.updateProgress(goalId);
            res.status(200).json(updatedGoal);
        } catch (error) {
            console.error("Error in updateProgress:", error);
            res.status(500).json({ error: "Failed to update goal progress" });
        }
    }

    async deleteGoal(req: Request, res: Response): Promise<void> {
        try {
            const goalId = parseInt(req.params.goalId);

            if (!goalId || isNaN(goalId)) {
                res.status(400).json({ error: "Invalid or missing goalId in request parameters" });
                return;
            }

            const isDeleted = await this.goalService.deleteGoal(goalId);

            if (!isDeleted) {
                res.status(404).json({ message: "Goal not found" });
            } else {
                res.status(200).json({ message: "Goal successfully deleted" });
            }
        } catch (error) {
            console.error("Error in deleteGoal:", error);
            res.status(500).json({ error: "Failed to delete goal" });
        }
    }

    async calculateProgress(req: Request, res: Response): Promise<void> {
        try {
            const { goalId } = req.body;
    
            if (!goalId || isNaN(goalId)) {
                res.status(400).json({ error: "Invalid or missing goalId" });
                return;
            }
    
            await this.goalService.updateProgress(goalId);
            res.status(200).json({ message: "Goal progress updated successfully" });
        } catch (error) {
            console.error("Error in updateProgress:", error);
            res.status(500).json({ error: "Failed to update goal progress" });
        }
    }
    
}

// import { Request, Response } from "express";
// import { goalService } from "../services/goalService";
// import { GoalDTO } from "../dto/goalDTO";

// export class GoalController {
//     private goalService: goalService;

//     constructor() {
//         this.goalService = new goalService();
//     }

//     // Create a new goal
//     async createGoal(req: Request, res: Response): Promise<void> {
//         try {
//             const { userId, goalData }: { userId: number; goalData: GoalDTO } = req.body;

//             // Validate input
//             if (!userId || !goalData || !goalData.name || !goalData.target) {
//                 res.status(400).json({ error: "Missing required fields: userId, name, or target" });
//                 return;
//             }

//             const newGoal = await this.goalService.createGoal(userId, goalData);
//             res.status(201).json(newGoal);
//         } catch (error) {
//             console.error("Error in createGoal:", error);
//             res.status(500).json({ error: "Failed to create a new goal" });
//         }
//     }

//     // Get all goals for a specific user
//     async getGoals(req: Request, res: Response): Promise<void> {
//         try {
//             const userId = parseInt(req.query.userId as string);

//             // Validate userId
//             if (!userId || isNaN(userId)) {
//                 res.status(400).json({ error: "Invalid or missing userId in request query" });
//                 return;
//             }

//             const goals = await this.goalService.getGoals(userId);

//             // If no goals are found
//             if (goals.length === 0) {
//                 res.status(404).json({ error: "No goals found for the specified user" });
//                 return;
//             }

//             res.status(200).json(goals);
//         } catch (error) {
//             console.error("Error in getGoals:", error);
//             res.status(500).json({ error: "Failed to retrieve goals" });
//         }
//     }

//     // Update progress or mark a goal as achieved
//     async updateGoal(req: Request, res: Response): Promise<void> {
//         try {
//             const { goalId, progress, achieved }: { goalId: number; progress: number; achieved: boolean } = req.body;

//             // Validate input
//             if (!goalId || isNaN(goalId)) {
//                 res.status(400).json({ error: "Invalid or missing goalId" });
//                 return;
//             }

//             if (progress == null || achieved == null) {
//                 res.status(400).json({ error: "Missing required fields: progress or achieved" });
//                 return;
//             }

//             const updatedGoal = await this.goalService.updateGoal(goalId, progress, achieved);
//             res.status(200).json(updatedGoal);
//         } catch (error) {
//             console.error("Error in updateGoal:", error);
//             res.status(500).json({ error: "Failed to update goal" });
//         }
//     }

//     async deleteGoal(req: Request, res: Response): Promise<void> {
//         try {
//             const goalId = parseInt(req.params.goalId);

//             // Validate goalId
//             if (!goalId || isNaN(goalId)) {
//                 res.status(400).json({ error: "Invalid or missing goalId in request parameters" });
//                 return;
//             }

//             const isDeleted = await this.goalService.deleteGoal(goalId);

//             if (!isDeleted) {
//                 res.status(404).json({ message: "Goal not found" });
//             } else {
//                 res.status(200).json({ message: "Goal successfully deleted" });
//             }
//         } catch (error) {
//             console.error("Error in deleteGoal:", error);
//             res.status(500).json({ error: "Failed to delete goal" });
//         }
//     }
// }
