import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";
import { AppDataSource } from "../config/database";
import { CustomError } from "../utils/errorhandler";

const authService = new AuthService(AppDataSource);

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const { username, password, mobile, email, role } = req.body;

    try {
      const result = await authService.register(username, password, mobile, email, role);
      res.status(201).json(result);
    } catch (error: any) {
      next(new CustomError(error.message || "Registration failed", 400));
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { username, password, secretKey } = req.body;

    try {
      const result = await authService.login(username, password);
      res.status(200).json(result);
    } catch (error: any) {
      next(new CustomError(error.message || "Login failed", 401));
    }
  }
}
