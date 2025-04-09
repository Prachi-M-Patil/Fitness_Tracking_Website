"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutRepository = void 0;
const database_1 = require("../config/database");
const Workout_1 = require("../entities/Workout");
exports.workoutRepository = database_1.AppDataSource.getRepository(Workout_1.Workout);
