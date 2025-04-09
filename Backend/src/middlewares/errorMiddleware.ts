import { CustomError } from "../utils/errorhandler";
import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
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


