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
exports.MealDTO = void 0;
const class_validator_1 = require("class-validator");
const nutritionDTO_1 = require("./nutritionDTO");
const User_1 = require("../entities/User");
const class_transformer_1 = require("class-transformer");
class MealDTO {
}
exports.MealDTO = MealDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MealDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MealDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MealDTO.prototype, "mealtype", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MealDTO.prototype, "calories", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MealDTO.prototype, "protein", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MealDTO.prototype, "carbs", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MealDTO.prototype, "fats", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MealDTO.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MealDTO.prototype, "liked", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MealDTO.prototype, "available", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MealDTO.prototype, "likesCount", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => nutritionDTO_1.NutritionDTO),
    __metadata("design:type", Array)
], MealDTO.prototype, "nutrition", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => User_1.User),
    __metadata("design:type", User_1.User)
], MealDTO.prototype, "users", void 0);
// import { User } from "../entities/User";
// import { NutritionDTO } from "./nutritionDTO";
// export interface MealDTO {
//     id: number;
//     name?: string;
//     mealtype: string;
//     calories: number;
//     protein?: number;
//     carbs?: number;
//     fats?: number;
//     rating?: number;
//     available: boolean;
//     liked?: boolean;
//     nutrition: NutritionDTO;
//     users: User;
//   }
