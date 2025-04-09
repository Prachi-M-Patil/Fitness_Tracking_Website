import { AppDataSource } from "../config/database";
import { Nutrition } from "../entities/Nutrition";

export const nutritionRepository = AppDataSource.getRepository(Nutrition);
