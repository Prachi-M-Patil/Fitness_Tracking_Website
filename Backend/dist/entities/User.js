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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Profile_1 = require("./Profile");
const Workout_1 = require("./Workout");
const Goal_1 = require("./Goal");
const Activity_1 = require("./Activity");
const Meal_1 = require("./Meal");
const Nutrition_1 = require("./Nutrition");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'user' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Profile_1.Profile, profile => profile.user, { cascade: true }),
    __metadata("design:type", Profile_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Workout_1.Workout, workout => workout.user),
    __metadata("design:type", Array)
], User.prototype, "workouts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Goal_1.Goal, goal => goal.user),
    __metadata("design:type", Array)
], User.prototype, "goals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Activity_1.Activity, activity => activity.user),
    __metadata("design:type", Array)
], User.prototype, "activities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Meal_1.Meal, meal => meal.users, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "meals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Nutrition_1.Nutrition, (nutrition) => nutrition.user) // One-to-one relationship with Nutrition
    ,
    __metadata("design:type", Array)
], User.prototype, "nutrition", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'User_Ft_Tracker' })
], User);
