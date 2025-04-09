import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workout } from "./Workout";

@Entity({name: 'Exercise_Ft_Tracker'})
export class Exercise{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    sets: number;

    @Column()
    reps: number;

    @Column()
    weight: number;

    // @ManyToOne(()=> Workout, workout => workout.exercises)
    // workout: Workout;

}