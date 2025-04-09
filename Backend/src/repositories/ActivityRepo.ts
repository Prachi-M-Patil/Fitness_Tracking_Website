import { AppDataSource } from "../config/database";
import { Activity } from "../entities/Activity";

export const activityRepository = AppDataSource.getRepository(Activity);
