import { AppDataSource } from "../config/database";
import { Profile } from "../entities/Profile";
import { Workout } from "../entities/Workout";

export const workoutRepository = AppDataSource.getRepository(Workout);
