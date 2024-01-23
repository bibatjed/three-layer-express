import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export default function (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation Failed",
      errors: err.flatten().fieldErrors,
    });
  }
  res.status(500).json({
    message: "Something went wrong",
  });
}
