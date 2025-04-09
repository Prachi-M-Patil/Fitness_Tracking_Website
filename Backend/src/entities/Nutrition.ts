import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinTable,
  } from "typeorm";
  import { Meal } from "./Meal";
  import { User } from "./User";
  
  @Entity({ name: "Nutrition_Ft_Tracker" })
  export class Nutrition {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: "float" , default: 0})
    dailyCalories: number;
  
    @Column({ type: "float" ,default: 0})
    dailyProtein: number;
  
    @Column({ type: "float" , default: 0})
    dailyCarbs: number;
  
    @Column({ type: "float" , default: 0})
    dailyFats: number;
  
    @ManyToMany(() => Meal, { cascade: true })
    @JoinTable()
    meals: Meal[];
  
    @ManyToOne(() => User, (user) => user.nutrition)
    user: User;
  }
  