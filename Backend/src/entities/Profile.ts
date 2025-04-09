import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'Profiles_Ft_Tracker'})
export class Profile{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    gender: string;

    @Column()
    weight: number;

    @Column()
    height: number;

    @Column()
    fitnessLevel : string;

    @Column({nullable: true})
    profilePicture: string;

    @OneToOne(()=> User, user => user.profile)
    @JoinColumn({name: "id"})
    user: User;
    
}

