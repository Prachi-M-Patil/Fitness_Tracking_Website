import { IsIn, IsNumber, IsOptional, IsPositive, IsString, Max, Min, Length } from "class-validator";
import { User } from "../entities/User";

export class ProfileDTO {
    id?: number; // Optional property for profile ID
    
    @IsOptional()
    @IsString()
    @Length(1, 100) // Validate length between 1 and 100 characters
    name?: string;

    @IsOptional()
    @IsString()
    profilePicture?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(0)
    @Max(120) // Validate age is between 0 and 120
    age?: number;

    @IsOptional()
    @IsString()
    @IsIn(['Male', 'Female', 'Other']) // Allow only specific genders
    gender?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(400) // Validate weight is between 0 and 400
    weight?: number;

    @IsOptional()
    @IsNumber()
    @Min(30)
    @Max(300) // Validate height is between 30 and 300
    height?: number;

    @IsOptional()
    @IsString()
    @Length(1, 50) // Validate fitnessLevel length between 1 and 50 characters
    fitnessLevel?: string;

    user? : User;
}
