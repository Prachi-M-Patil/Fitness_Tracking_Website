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
exports.ActivityController = void 0;
class ActivityController {
    constructor(activityService) {
        this.activityService = activityService;
    }
    addActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activityData = req.body;
                const activity = yield this.activityService.addActivity(activityData);
                res.status(201).json(activity);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    updateActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activityId = parseInt(req.params.id, 10);
                const activityData = req.body;
                const activity = yield this.activityService.updateActivity(activityId, activityData);
                res.status(200).json(activity);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    deleteActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activityId = parseInt(req.params.id, 10);
                yield this.activityService.deleteActivity(activityId);
                res.status(200).json({ message: 'Activity deleted successfully' });
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getActivityById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activityId = parseInt(req.params.id, 10);
                const activity = yield this.activityService.getActivityById(activityId);
                res.status(200).json(activity);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getAllActivities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activities = yield this.activityService.getAllActivities();
                res.status(200).json(activities);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
    getUserActivities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                const activities = yield this.activityService.getUserActivities(userId);
                res.status(200).json(activities);
            }
            catch (error) {
                res.status(error.status || 500).json({ message: error.message });
            }
        });
    }
}
exports.ActivityController = ActivityController;
