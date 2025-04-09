import { IsString, IsNumber, IsDate, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../entities/User';

export class ActivityDTO {
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    activityType: string;

    @IsNumber()
    duration: number;

    @IsNumber()
    distance: number;

    @IsDate()
    date: Date;

    @ValidateNested()
    @Type(() => User)
    user: User;
}
