"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const profileRoutes_1 = __importDefault(require("./routes/profileRoutes"));
const workoutRoute_1 = __importDefault(require("./routes/workoutRoute"));
const goalRoutes_1 = __importDefault(require("./routes/goalRoutes"));
// import mealsRouter from "./routes/MealRoutes";
// import nutritionrouter from "./routes/NutritionRoutes";
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const MealRoutes_1 = __importDefault(require("./routes/MealRoutes"));
const NutritionRoutes_1 = __importDefault(require("./routes/NutritionRoutes"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const path = __importStar(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/profile', profileRoutes_1.default);
app.use('/api/workout', workoutRoute_1.default);
app.use('/api/goals', goalRoutes_1.default);
app.use('/api/meals', MealRoutes_1.default);
app.use('/api/nutritions', NutritionRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.use('api/activity', activityRoutes_1.default);
app.use('/uploads', express_1.default.static(path.join(__dirname, 'src/uploads')));
app.use(errorMiddleware_1.errorMiddleware);
database_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source Initialized");
})
    .catch((err) => {
    console.error("Error initializing Data Source", err);
});
const PORT = 3300;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
