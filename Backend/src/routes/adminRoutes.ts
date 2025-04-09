import { Router } from "express";
import { AdminDashboardController } from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AdminDashboardService } from "../services/AdminService";

const router = Router();
const adminDashboardService = new AdminDashboardService();
const adminDashboardController = new AdminDashboardController(adminDashboardService);

router.post("/users", authMiddleware(['admin']), (req, res) => adminDashboardController.addUser(req, res));
router.put("/users/:userId", authMiddleware(['admin']), (req, res) => adminDashboardController.updateUser(req, res));
router.delete("/users/:userId", authMiddleware(['admin']), (req, res) => adminDashboardController.deactivateUser(req, res));
router.get("/users", authMiddleware(['admin']), (req, res) => adminDashboardController.searchUsers(req, res));
router.get("/user/:userId/workouts", authMiddleware(['admin']), (req, res) => adminDashboardController.getUserWorkouts(req, res));
router.get("/user/:userId/goals", authMiddleware(['admin']), (req, res) => adminDashboardController.getUserGoals(req, res));
// router.get("/users/:userId/activities", authMiddleware(['admin']), (req, res) => adminDashboardController.getUserActivities(req, res));
router.get("/user/:userId/meals", authMiddleware(['admin']), (req, res) => adminDashboardController.getUserMeals(req, res));
router.get("/user/:userId/liked-meals", authMiddleware(['admin']), (req, res) => adminDashboardController.getUserLikedMeals(req, res));
router.get("/deactivated-users", authMiddleware(['admin']), (req, res) => adminDashboardController.getDeactivatedUsers(req, res));
router.put("/activate-user/:userId",authMiddleware(['admin']), (req, res) => adminDashboardController.activateUser(req,res));

export default router;
