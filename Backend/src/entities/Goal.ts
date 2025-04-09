import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Activity } from "./Activity";
import { Workout } from "./Workout";

@Entity({name: 'Goal_Ft_Tracker'})
export class Goal {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    goalType: string; //e.g. weight loss
    
    @Column()
    target: string; //loss 5 kg
    
    @Column({default: false})
    achieved: boolean;
    
    @Column({type: "float", default: 0})
    progress: number;
    
    @Column()
    createdAt: Date;
    
    @Column({type:'date', nullable: true})
    deadline: string;
    
    // @Column("simple-array", { nullable: true })
    // targetWorkoutTypes: string[]; // Array of workout types needed for this goal
    
    @Column({ default: 1 })
    requiredWorkouts: number; // Number of workouts needed to complete the goal
    
    @Column({ default: 0 })
    completedWorkouts: number; // Count of completed workouts for this goal
    
    @ManyToOne(()=> User, user => user.goals)
    user: User;

    @ManyToMany(() => Workout, workout => workout.goals)
    @JoinTable({
        name: "goal_workout_ft_tracker",
        joinColumn: { name: "goalId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "workoutId", referencedColumnName: "id" }
    })
    workouts: Workout[];
 
    
    // @OneToMany(() => Activity, activity => activity.goal)
    // activities: Activity[];
}

// import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { User } from "./User";
// import { Activity } from "./Activity";

// @Entity({name: 'Goal_Ft_Tracker'})
// export class Goal{
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     goalType: string; //e.g. weight loss

//     @Column()
//     target: string; //loss 5 kg

//     @Column({default: false})
//     achieved: boolean;

//     @Column({nullable: true})
//     progress: number;

//     @Column()
//     createdAt: Date;

//     @Column({type:'date', nullable: true})
//     deadline: string;

//     @ManyToOne(()=> User, user => user.goals)
//     user: User;

//     // @OneToMany(() => Activity, activity => activity.goal)
//     // activities: Activity[];


// }