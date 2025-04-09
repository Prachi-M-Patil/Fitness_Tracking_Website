import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../entities/User';
import { MealDTO } from './mealDTO';

export class NutritionDTO {
    @IsNumber()
    id: number;

    @IsNumber()
    dailyCalories: number;

    @IsNumber()
    dailyProtein: number;

    @IsNumber()
    dailyCarbs: number;

    @IsNumber()
    dailyFats: number;

    @ValidateNested({ each: true })
    @Type(() => MealDTO)
    meals: MealDTO[];

    @ValidateNested()
    @Type(() => User)
    user: User;
}

// import { User } from "../entities/User";
// import { MealDTO } from "./mealDTO";

// export class NutritionDTO {
//     id: number;
//     dailyCalories: number;
//     dailyProtein: number;
//     dailyCarbs: number;
//     dailyFats: number;
//     meals: MealDTO[];
//     user: User;
// }
