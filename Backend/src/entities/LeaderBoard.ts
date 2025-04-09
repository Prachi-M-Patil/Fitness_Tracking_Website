import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'LeaderBoard_Ft_Tracker'})
export class Leaderboard{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> User)
    user: User;

    @Column()
    totalWorkouts: number;

    @Column()
    totalCaloriesBurned: number;

    @Column()
    rank: number;

}