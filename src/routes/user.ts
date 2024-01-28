import express from "express";
import UserController from "src/controllers/User";
import UserService from "src/services/user/User";
import { IRepository } from "src/repository";
const router = express.Router();


export default function initializeUserRouter(repository: IRepository) {
  const userService = new UserService(repository);
  const userController = new UserController(userService);

  /**
   * @swagger
   * /users/register:
   *   post:
   *     tags:
   *       - Users
   *     summary: Register a new user.
   *     description: Register a new user.
   *     requestBody:
   *       description: User details to register.
   *       required: true
   *       content:
   *         application/json:
   *               schema:
   *                 $ref: '#/components/schemas/RegisterUser'
   *
   *     responses:
   *       200:
   *         description: Success User Registration.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "User is registered"
   *       400:
   *        description: Validation Error.
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UserRegistrationValidationError'
   *            example:
   *              message: Validation Failed
   *              errors:
   *               email: ["Required"]
   *               password: ["Required"]
   *               firstName: ["Required"]
   *               lastName: ["Required"]
   *       409:
   *        description: User is already registered.
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UserAlreadyRegisteredResponse'
   */
  router.post("/register", userController.register);

  return router;
}


/**
 * @swagger
 *   components:
 *     schemas:
 *       RegisterUser:
 *         type: object
 *         required:
 *              - email
 *              - password
 *              - firstName
 *              - lastName
 *         properties:
 *           email:
 *             type: string
 *             example: user@gmail.com
 *             required: true
 *           password:
 *             type: string
 *             example: password12345 
 *             required: true
 *           firstName:
 *             type: string
 *             example: hello 
 *             required: true
 *           middleName:
 *             type: string
 *             example: hello 
 *           lastName:
 *             type: string
 *             example: hi 
 *             required: true
 *       UserAlreadyRegisteredResponse:
 *         type: object
 *         properties:
 *           message:
 *             type: string
 *             description: The message indicating that the user is already registered.
 *       UserRegistrationValidationError:
 *         type: object
 *         properties:
 *           message:
 *             type: string
 *             description: The error message indicating validation failure.
 *           errors:
 *             type: object
 *             description: Object containing validation errors for different fields.
 *             properties:
 *               email:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Validation errors for the 'email' field.
 *               password:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Validation errors for the 'password' field.
 *               firstName:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Validation errors for the 'firstName' field.
 *               lastName:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Validation errors for the 'lastName' field.
 */





