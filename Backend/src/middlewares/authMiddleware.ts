import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { decode } from 'punycode';

dotenv.config();
//The user is logged in by checking the presence and validity of the JWT token.
//The user's role matches one of the allowed roles for the endpoint.
interface DecodedToken {
    id: string; // Add all relevant fields from your JWT payload
    role: string;
    iat?: number; // Issued at timestamp
    exp?: number; // Expiration timestamp
}

export const authMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.split(' ')[1]; // Extract the token from Bearer

        if (!token) {
            return res.status(401).json({ message: 'Access Denied' });
        }

        try {
            const secretKey = process.env.JWT_SECRET!;
            const decoded = jwt.verify(token, secretKey) as DecodedToken;

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
            (req as any).user = decoded;
            next();
        } catch (error) {
            console.error("Token verification error:", error); // Log the error
            res.status(401).json({ message: 'Invalid Token' });

        }
    };
};
