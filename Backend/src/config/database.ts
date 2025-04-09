import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Import entities
import { User } from "../entities/User";
import { Profile } from "../entities/Profile";
import { Workout } from "../entities/Workout";
import { Goal } from "../entities/Goal";
import { Activity } from "../entities/Activity";
import { Exercise } from "../entities/Exercise";
import { Friends } from "../entities/Friends";
import { Leaderboard } from "../entities/LeaderBoard";
import { Meal } from "../entities/Meal";
import { Nutrition } from "../entities/Nutrition";

// Create and export the data source
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    User,
    Profile,
    Workout,
    Goal,
    Activity,
    Exercise,
    Friends,
    Leaderboard,
    Meal,
    Nutrition,
  ],
  synchronize: false, // Use false in production
  logging: true,
});
