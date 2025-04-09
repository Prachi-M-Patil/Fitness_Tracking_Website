"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goal = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Workout_1 = require("./Workout");
let Goal = class Goal {
};
exports.Goal = Goal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Goal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Goal.prototype, "goalType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Goal.prototype, "target", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Goal.prototype, "achieved", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0 }),
    __metadata("design:type", Number)
], Goal.prototype, "progress", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Goal.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", String)
], Goal.prototype, "deadline", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Goal.prototype, "requiredWorkouts", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Goal.prototype, "completedWorkouts", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.goals),
    __metadata("design:type", User_1.User)
], Goal.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Workout_1.Workout, workout => workout.goals),
    (0, typeorm_1.JoinTable)({
        name: "goal_workout_ft_tracker",
        joinColumn: { name: "goalId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "workoutId", referencedColumnName: "id" }
    }),
    __metadata("design:type", Array)
], Goal.prototype, "workouts", void 0);
exports.Goal = Goal = __decorate([
    (0, typeorm_1.Entity)({ name: 'Goal_Ft_Tracker' })
], Goal);
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
