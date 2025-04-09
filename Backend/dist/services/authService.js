"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../entities/User");
const errorhandler_1 = require("../utils/errorhandler");
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";
const JWT_SECRET = process.env.JWT_SECRET || "default_jwt_secret";
class AuthService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    register(username, password, mobile, email, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = this.dataSource.getRepository(User_1.User);
            const existingUser = yield userRepository.findOne({ where: { username } });
            if (existingUser) {
                throw { status: 400, message: 'Username already exists' };
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = userRepository.create({ username, password: hashedPassword, mobile, email, role });
            yield userRepository.save(user);
            return { message: 'User registered successfully',
            };
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = this.dataSource.getRepository(User_1.User);
            console.log('Expected Secret Key:', SECRET_KEY);
            const user = yield userRepository.findOne({ where: { username } });
            if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                throw new errorhandler_1.CustomError('Invalid credentials', 401);
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
            return { token, user: { id: user.id, username: user.username, role: user.role } };
        });
    }
}
exports.AuthService = AuthService;
