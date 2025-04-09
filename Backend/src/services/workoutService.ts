import { workoutDTO } from "../dto/workoutDTO";
import { Workout } from "../entities/Workout";
import { goalRepository } from "../repositories/GoalRepo";
import { workoutRepository } from "../repositories/WorkoutRepo";
import { goalService } from "./goalService";

export class WorkoutService {
    private goalService: goalService;

    constructor() {
        this.goalService = new goalService();
    }

   // Log a workout and update goal progress
async logWorkout(userId: number, workoutData: workoutDTO): Promise<Workout> {
    const workoutToCreate: any = {
        type: workoutData.type,
        duration: workoutData.duration,
        date: workoutData.date,
        caloriesBurned: workoutData.caloriesBurned,
        user: { id: userId }
    };

    const workout = await workoutRepository.create(workoutToCreate);
    const savedWorkout = await workoutRepository.save(workout); // Ensure this is a single entity.

    // If savedWorkout might be an array, handle it here:
    if (Array.isArray(savedWorkout)) {
        throw new Error("workoutRepository.save unexpectedly returned an array");
    }

    // Update goal progress for associated goals
    if (workoutData.goalIds && workoutData.goalIds.length > 0) {
        for (const goalId of workoutData.goalIds) {
            try {
                await this.goalService.updateProgress(goalId);
            } catch (error) {
                console.error(`Error updating goal progress for goal ${goalId}:`, error);
            }
        }
    }

    return savedWorkout;
}

async getWorkouts(userId: number): Promise<Workout[]> {
        const workouts = await workoutRepository.find({
            where: { user: { id: userId } },
            relations: ["user"]
        });
        return workouts;
    }

async deleteWorkout(workoutId: number): Promise<void> {
        const workout = await workoutRepository.findOne({
            where: { id: workoutId },
            relations: ["goals"]
        });

        if (!workout) {
            throw new Error(`Workout with id ${workoutId} not found`);
        }

        // Delete the workout
        await workoutRepository.delete(workoutId);

        // Update progress for associated goals
        if (workout.goals) {
            for (const goal of workout.goals) {
                await this.goalService.updateProgress(goal.id);
            }
        }
    }

async completeWorkout(workoutId: number): Promise<void> {
        // Fetch the workout
        const workout = await workoutRepository.findOne({
            where: { id: workoutId },
            relations: ["goals"]
        });

        if (!workout) {
            throw new Error(`Workout with id ${workoutId} not found`);
        }

        // Mark the workout as completed
        workout.completed = true;
        await workoutRepository.save(workout);

        // Update progress for associated goals
        if (workout.goals) {
            for (const goal of workout.goals) {
                await this.updateGoalProgress(goal.id);
            }
        }
    }

async updateGoalProgress(goalId: number): Promise<void> {
        // Fetch the goal with associated workouts
        const goal = await goalRepository.findOne({
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
        await goalRepository.save(goal);
    }

    
}




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