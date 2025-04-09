"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorhandler_1 = require("../utils/errorhandler");
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof errorhandler_1.CustomError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    res.status(500).json({
        status: "error",
        message: "Something went wrong",
    });
};
exports.errorMiddleware = errorMiddleware;
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
