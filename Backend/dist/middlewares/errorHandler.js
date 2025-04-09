"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.CustomError = CustomError;
// status?: number;
//   stack?: string;
// }  
// const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
//   console.log("global exception from backend");
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     message: err.message || 'Internal Server Error',
//     status: err.status || 500,
//   });
// };
