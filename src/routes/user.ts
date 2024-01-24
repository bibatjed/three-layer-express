import express from "express";
import UserController from "../controllers/User";
import UserService from "../services/user/User";
import initializeRepository, { IRepository } from "../repository";
const router = express.Router();

export default function initializeUserRouter(repository: IRepository) {
  const userService = new UserService(repository);
  const userController = new UserController(userService);

  router.post("/register", userController.register);

  return router;
}

