export interface GoalDTO {
    name: string;          // Name/type of the goal (e.g., "weight loss", "muscle gain")
    target: string;        // Target value (e.g., "lose 5kg", "run 10km")
    deadline?: string;      // Optional deadline for the goal
    progress?: number;      // Optional initial progress value
    requiredWorkoutTypes: string[]; // Names of the workout types selected by the user
    requiredWorkouts?: number;     // Number of workouts required to reach 100%
    workoutIds: number[]; // IDs of workouts to associate with the goal
    // targetWorkoutTypes?: string[]; // Types of workouts needed to complete this goal

}

// import { IsString, IsNumber, IsBoolean, IsDate, ValidateNested, IsNotEmpty } from 'class-validator';
// import { Type } from 'class-transformer';
// import { User } from '../entities/User';

// export class GoalDTO {
//     @IsNumber()
//     id: number;

//     @IsString()
//     @IsNotEmpty()
//     name: string;

//     @IsString()
//     @IsNotEmpty()
//     goalType: string;

//     @IsString()
//     @IsNotEmpty()
//     target: string;

//     @IsBoolean()
//     achieved: boolean;

//     @IsNumber()
//     progress: number;

//     @IsDate()
//     createdAt: Date;

//     @IsString()
//     deadline: string;

//     @ValidateNested()
//     @Type(() => User)
//     user: User;
// }
