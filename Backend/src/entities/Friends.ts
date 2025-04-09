import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'Friends_Ft_Tracker'})
export class Friends{
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(()=> User, user=> user.sentFriendsRequest)
    // sender: User;

    // @ManyToOne(()=> User, user=> user.receiveFriendRequest)
    // receiver: User;

    @Column({default: 'Pending'})
    status: string;

    @CreateDateColumn()
    createdDate: Date;

}