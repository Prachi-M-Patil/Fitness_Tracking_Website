import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";
import { Workout } from "./Workout";
import { Goal } from "./Goal";
import { Activity } from "./Activity";
import { Meal } from "./Meal";
import { Nutrition } from "./Nutrition";

@Entity({name: 'User_Ft_Tracker'})
export class User{
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true })
    username: string;

    @Column({unique: true})
    email: String;

    @Column( )
    password: String;

    @Column()
    mobile : number;

    @Column({ default: true })
    active: boolean; 

    @Column({ default: 'user' })
    role: 'user'| 'admin';

    @OneToOne(()=> Profile , profile => profile.user, {cascade: true})
    profile: Profile;

    @OneToMany(()=> Workout, workout => workout.user)
    workouts: Workout[];

    @OneToMany(()=> Goal, goal => goal.user)
    goals: Goal[];
    
    @OneToMany(()=> Activity, activity => activity.user)
    activities: Activity[];

    @OneToMany(() => Meal, meal => meal.users,  { cascade:true } )
    meals: Meal[];

    @OneToMany(() => Nutrition, (nutrition)=> nutrition.user) // One-to-one relationship with Nutrition
    nutrition: Nutrition[];

    // @ManyToMany(()=> User)
    // @JoinTable()
    // friends: User[];
       
}