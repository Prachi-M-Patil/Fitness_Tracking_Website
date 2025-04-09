import express from "express";
import { AuthController } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";


const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.get('/secret-key', authMiddleware, (req, res) => {
    const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
  
    // Example: Customize the secret key dynamically for each user
    const userId = req.user.id; // Assume `req.user` contains the authenticated user info
    const dynamicSecretKey = `${SECRET_KEY}-${userId}`;
  
    res.status(200).json({ secretKey: dynamicSecretKey });
  });

export default router;
