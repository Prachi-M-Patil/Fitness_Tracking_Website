"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityRepository = void 0;
const database_1 = require("../config/database");
const Activity_1 = require("../entities/Activity");
exports.activityRepository = database_1.AppDataSource.getRepository(Activity_1.Activity);
