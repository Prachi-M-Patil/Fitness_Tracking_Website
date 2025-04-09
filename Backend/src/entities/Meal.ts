import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Nutrition } from "./Nutrition";
import { User } from "./User";

@Entity({name: 'Meal_Ft_Tracker'})
export class Meal{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    mealtype: string; //breakfast, lunch, dinner

    @Column()
    calories: number;

    @Column()
    protein : number;

    @Column()
    carbs: number;

    @Column()
    fats: number;

    @Column()
    rating: number;
    
    @Column({ default: false })
    liked: boolean;
    

    @Column({ default: true })
    available: boolean;

    @Column({ default: 0 ,nullable: false})
    likesCount: number;

    // @OneToMany(()=> Nutrition, nutrition => nutrition.meals)
    // nutrition: Nutrition[];

    @ManyToMany(() => Nutrition, { cascade: true })
    @JoinTable()
    nutrition: Nutrition[];

    @ManyToOne(() => User, (user) => user.meals)
    users: User[]; // Ensure this is an array of users

    // @ManyToOne(() => User, users => users.meals, {onDelete: "CASCADE"})
    // // @JoinColumn()// Creates the join table for the relationship
    // users: User[];
    
}
