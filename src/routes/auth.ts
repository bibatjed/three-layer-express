import express from "express";
import AuthController from "@src/controllers/Auth";
import AuthService from "@src/services/auth/Auth";
import { IRepository } from "@src/repository";
const router = express.Router();
export default function intializeAuthRouter(repository: IRepository) {
  const authService = new AuthService(repository);
  const authController = new AuthController(authService);

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Login user.
   *     description: Login user.
   *     requestBody:
   *       description: User credentials to login.
   *       required: true
   *       content:
   *         application/json:
   *               schema:
   *                 $ref: '#/components/schemas/LoginUser'
   *
   *     responses:
   *       200:
   *         description: Success User Login.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/LoginSuccessResponse'
   *         headers:
   *           Set-Cookie:
   *             schema:
   *               type: string
   *               example: refreshToken=abcde12345; Path=/; HttpOnly
   *       400:
   *        description: Validation Error.
   *        content:
   *          application/json:
   *             schema:
   *               $ref: '#/components/schemas/LoginValidationError'
   *             example:
   *               message: Validation Failed
   *               errors:
   *                 email: ["Required"]
   *                 password: ["Required"]
   *       401:
   *        description: Invalid Credentials.
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/LoginInvalidCredentials'
   */
  router.post("/login", authController.login);

  /**
   * @swagger
   * tags:
   *   - name: Auth
   *     description: Example API endpoints
   * securityDefinitions:
   *   CookieAuth:
   *     type: apiKey
   *     in: cookie
   *     name: refreshToken
   */

  /**
   * @swagger
   * /auth/refresh-token:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Refresh token user.
   *     description: Refresh token user.
   *     security:
   *       - CookieAuth: []
   *     responses:
   *       200:
   *         description: Success Refresh token.
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/LoginSuccessResponse'
   *         headers:
   *           Set-Cookie:
   *             schema:
   *               type: string
   *               example: refreshToken=abcde12345; Path=/; HttpOnly
   *       401:
   *        description: Invalid token.
   *        content:
   *          application/json:
   *             schema:
   *               $ref: '#/components/schemas/RefreshTokenInvalidOrExpired'
   *             example:
   *               message: Token expired | Invalid token
   *       404:
   *        description: User not found.
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/RefreshTokenUserNotFound'
   */
  router.post("/refresh-token", authController.refreshToken);
  return router;
}


/**
 * @swagger
 *   components:
 *     schemas:
 *       LoginUser:
 *         type: object
 *         required:
 *              - email
 *              - password
 *         properties:
 *           email:
 *             type: string
 *             example: user@gmail.com
 *             required: true
 *           password:
 *             type: string
 *             example: password12345 
 *             required: true
 *       LoginSuccessResponse:
 *         type: object
 *         properties:
 *           message:
 *             type: string
 *             description: The success message.
 *           token:
 *             type: string
 *             description: The authentication token associated with the success.
 *       LoginInvalidCredentials:
 *         type: object
 *         properties:
 *           message:
 *             type: string
 *             description: The message indicating that the user credential is incorrect.
 *       RefreshTokenUserNotFound:
 *         type: object
 *         properties:
 *           message:
 *             type: string
 *             description: The message indicating that the user is not found.
 *       RefreshTokenInvalidOrExpired:
 *         type: object
 *         properties:
 *           message:
 *             type: string
 *             description: The message indicating that the refresh token is invalid or expired.
 *       LoginValidationError:
 *         type: object
 *         properties:
 *           message:
 *             type: string
 *             description: The error message.
 *           errors:
 *             type: object
 *             description: Object containing specific error details.
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
 */
