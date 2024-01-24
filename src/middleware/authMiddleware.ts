import { NextFunction, Request, Response } from "express";

export type UserRequest = {
  user: { id: number };
} & Request;
export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     if (!ref) return next();
  //   } catch (e) {
  //     return next(e);
  //   }
}
