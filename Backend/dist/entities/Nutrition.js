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
exports.Nutrition = void 0;
const typeorm_1 = require("typeorm");
const Meal_1 = require("./Meal");
const User_1 = require("./User");
let Nutrition = class Nutrition {
};
exports.Nutrition = Nutrition;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Nutrition.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0 }),
    __metadata("design:type", Number)
], Nutrition.prototype, "dailyCalories", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0 }),
    __metadata("design:type", Number)
], Nutrition.prototype, "dailyProtein", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0 }),
    __metadata("design:type", Number)
], Nutrition.prototype, "dailyCarbs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", default: 0 }),
    __metadata("design:type", Number)
], Nutrition.prototype, "dailyFats", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Meal_1.Meal, { cascade: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Nutrition.prototype, "meals", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.nutrition),
    __metadata("design:type", User_1.User)
], Nutrition.prototype, "user", void 0);
exports.Nutrition = Nutrition = __decorate([
    (0, typeorm_1.Entity)({ name: "Nutrition_Ft_Tracker" })
], Nutrition);
