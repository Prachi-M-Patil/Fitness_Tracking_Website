import { IsString, IsNumber, IsBoolean, ValidateNested, IsNotEmpty } from 'class-validator';
import { NutritionDTO } from './nutritionDTO';
import { User } from '../entities/User';
import { Type } from 'class-transformer';

export class MealDTO {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    mealtype: string;

    @IsNumber()
    calories: number;

    @IsNumber()
    protein: number;

    @IsNumber()
    carbs: number;

    @IsNumber()
    fats: number;

    @IsNumber()
    rating: number;

    @IsBoolean()
    liked: boolean;

    @IsBoolean()
    available: boolean;

    @IsNumber()
    likesCount: number; // Optional: defaults to 0

    @ValidateNested()
    @Type(() => NutritionDTO)
    nutrition: NutritionDTO[];

    @ValidateNested()
    @Type(() => User)
    users: User;
}

// import { User } from "../entities/User";
// import { NutritionDTO } from "./nutritionDTO";

// export interface MealDTO {
//     id: number;
//     name?: string;
//     mealtype: string;
//     calories: number;
//     protein?: number;
//     carbs?: number;
//     fats?: number;
//     rating?: number;
//     available: boolean;
//     liked?: boolean;
//     nutrition: NutritionDTO;
//     users: User;
//   }
  