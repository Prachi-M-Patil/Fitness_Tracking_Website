"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post("/register", authController_1.AuthController.register);
router.post("/login", authController_1.AuthController.login);
router.get('/secret-key', authMiddleware_1.authMiddleware, (req, res) => {
    const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
    // Example: Customize the secret key dynamically for each user
    const userId = req.user.id; // Assume `req.user` contains the authenticated user info
    const dynamicSecretKey = `${SECRET_KEY}-${userId}`;
    res.status(200).json({ secretKey: dynamicSecretKey });
});
exports.default = router;
