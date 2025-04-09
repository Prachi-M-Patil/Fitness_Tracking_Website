import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'Activity_Ft_Tracker'})
export class Activity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    activityType: string;//running, cycling, swimming

    @Column()
    duration: number;//in minutes

    @Column()
    distance: number;//in km

    @Column()
    achieved: boolean;

    @Column()
    date: Date;

    @ManyToOne(()=> User, user  => user.activities)
    user: User;


}