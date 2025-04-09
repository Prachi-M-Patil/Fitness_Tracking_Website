"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealRepository = void 0;
const database_1 = require("../config/database");
const Meal_1 = require("../entities/Meal");
exports.mealRepository = database_1.AppDataSource.getRepository(Meal_1.Meal);
