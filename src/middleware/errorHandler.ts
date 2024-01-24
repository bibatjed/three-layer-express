import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import ErrorService from "@src/services/ErrorService";

export default function (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation Failed",
      errors: err.flatten().fieldErrors,
    });
  }

  if (err instanceof ErrorService) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Something went wrong",
  });
}
