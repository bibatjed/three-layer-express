import express from "express";
import UserController from "../controllers/User";
import UserService from "../services/user/User";
import initializeRepository from "../repository";
const router = express.Router();

const repository = initializeRepository();
const userService = new UserService(repository);
const userController = new UserController(userService);

router.post("/register", userController.register);

export default router;
