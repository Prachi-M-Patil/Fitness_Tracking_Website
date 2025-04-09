"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (roles) => {
    return (req, res, next) => {
        var _a;
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract the token from Bearer
        if (!token) {
            return res.status(401).json({ message: 'Access Denied' });
        }
        try {
            const secretKey = process.env.JWT_SECRET;
            const decoded = jsonwebtoken_1.default.verify(token, secretKey);
            console.log(decoded);
            // Check if the user role is allowed
            if (!roles.includes(decoded.role)) {
                console.log("global error handler");
                // const error = new Error('Forbidden') as CustomError;
                // error.status = 403;
                // throw error; // This will be caught by your error handler middleware
                return res.status(403).json({ message: 'Forbidden' });
            }
            // Attach user info to the request object
            req.user = decoded;
            next();
        }
        catch (error) {
            console.error("Token verification error:", error); // Log the error
            res.status(401).json({ message: 'Invalid Token' });
        }
    };
};
exports.authMiddleware = authMiddleware;
