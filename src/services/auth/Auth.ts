import { IAuthService } from "../../controllers/Auth";
import { generateJwt, generateRefreshToken } from "../../jwt";
import { IRepository } from "../../repository";
import ErrorService from "../ErrorService";
import { validateLogin } from "./validate";

class AuthService implements IAuthService {
  constructor(private readonly repository: IRepository) {}
  login = async (loginDetails: { email: string; password: string }) => {
    validateLogin(loginDetails);
    const { jwt, refreshToken } = await this.repository.startTransaction(async (transaction) => {
      const userResult = await this.repository.user.findUserByEmail(loginDetails.email, transaction);

      if (!userResult) throw new ErrorService(400, "Invalid email or password");

      const isPasswordCorrect = await userResult.comparePassword(loginDetails.password);

      if (!isPasswordCorrect) throw new ErrorService(400, "Invalid email or password");

      const [jwt, refreshToken] = await Promise.all([generateJwt({ id: userResult.id }), generateRefreshToken({ id: userResult.id })]);
      return { jwt, refreshToken };
    });

    return { message: "Success", jwt, refreshToken };
  };
}

export default AuthService;
