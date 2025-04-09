"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalRepository = void 0;
const database_1 = require("../config/database");
const Goal_1 = require("../entities/Goal");
exports.goalRepository = database_1.AppDataSource.getRepository(Goal_1.Goal);
