"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRepository = void 0;
const database_1 = require("../config/database");
const Profile_1 = require("../entities/Profile");
exports.ProfileRepository = database_1.AppDataSource.getRepository(Profile_1.Profile);
