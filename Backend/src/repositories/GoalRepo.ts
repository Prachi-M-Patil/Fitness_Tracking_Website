import { AppDataSource } from "../config/database";
import { Goal } from "../entities/Goal";

export const goalRepository = AppDataSource.getRepository(Goal);
