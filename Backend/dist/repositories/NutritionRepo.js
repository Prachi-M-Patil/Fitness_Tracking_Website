"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nutritionRepository = void 0;
const database_1 = require("../config/database");
const Nutrition_1 = require("../entities/Nutrition");
exports.nutritionRepository = database_1.AppDataSource.getRepository(Nutrition_1.Nutrition);
