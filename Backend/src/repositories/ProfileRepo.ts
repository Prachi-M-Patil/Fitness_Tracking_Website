import { AppDataSource } from "../config/database";
import { Profile } from "../entities/Profile";

export const ProfileRepository = AppDataSource.getRepository(Profile);
