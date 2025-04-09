import { DataSource } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { CustomError } from "../utils/errorhandler";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";

export class AuthService {
    constructor(private dataSource: DataSource) {}

    async register(
        username: string,
        password: string,
        mobile: number,
        email: string,
        role: 'user'| 'admin'
    ): Promise<{ message: string }> {
        const userRepository = this.dataSource.getRepository(User);

        const existingUser = await userRepository.findOne({ where: { username } });
        if (existingUser) {
            throw { status: 400, message: 'Username already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = userRepository.create({ username, password: hashedPassword, mobile, email, role });
        await userRepository.save(user);

        return { message: 'User registered successfully',
         };
    }

    async login(username: string, password: string): Promise<{ token: string; user: any }> {
        const userRepository = this.dataSource.getRepository(User);
        console.log('Expected Secret Key:', SECRET_KEY);
        const user = await userRepository.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new CustomError('Invalid credentials' , 401);
        }


        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { token, user: { id: user.id, username: user.username, role: user.role } };
    }
}

