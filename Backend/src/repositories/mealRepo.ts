import { AppDataSource } from "../config/database";
import { Meal } from "../entities/Meal";

export const mealRepository = AppDataSource.getRepository(Meal);
