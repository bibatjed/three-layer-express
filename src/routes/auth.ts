import express from "express";
import AuthController from "../controllers/Auth";
import AuthService from "../services/auth/Auth";
import { IRepository } from "../repository";
const router = express.Router();
export default function intializeAuthRouter(repository: IRepository) {
  const authService = new AuthService(repository);
  const authController = new AuthController(authService);

  router.post("/login", authController.login);
  return router;
}
