"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityService = void 0;
const ActivityRepo_1 = require("../repositories/ActivityRepo");
class ActivityService {
    addActivity(activityData) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = ActivityRepo_1.activityRepository.create(activityData);
            return yield ActivityRepo_1.activityRepository.save(activity);
        });
    }
    updateActivity(activityId, activityData) {
        return __awaiter(this, void 0, void 0, function* () {
            const activity = yield ActivityRepo_1.activityRepository.findOne({ where: { id: activityId } });
            if (!activity) {
                return null;
            }
            Object.assign(activity, activityData);
            const updatedActivity = yield ActivityRepo_1.activityRepository.save(activity);
            return updatedActivity;
        });
    }
    deleteActivity(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ActivityRepo_1.activityRepository.delete(activityId);
        });
    }
    getActivityById(activityId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ActivityRepo_1.activityRepository.findOne({ where: { id: activityId }, relations: ["user"] });
        });
    }
    getAllActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ActivityRepo_1.activityRepository.find({ relations: ["user"] });
        });
    }
    getUserActivities(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ActivityRepo_1.activityRepository.find({ where: { user: { id: userId } }, relations: ["user"] });
        });
    }
}
exports.ActivityService = ActivityService;
