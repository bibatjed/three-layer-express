import { Transaction } from "sequelize";
import User from "../models/User";

export interface IUserRepository {
  registerUser: (userDetails: { firstName: string; middleName: string; lastName: string; email: string; password: string }, transaction: Transaction | null) => Promise<User>;
  findUserByEmail: (email: string, transaction?: Transaction | null) => Promise<User | null>;
}

class UserRepository implements IUserRepository {
  async registerUser(userDetails: { firstName: string; middleName: string; lastName: string; email: string; password: string }, transaction: Transaction | null = null) {
    return User.create(userDetails, {
      transaction,
    });
  }

  async findUserByEmail(email: string, transaction: Transaction | null = null) {
    return User.findOne({
      where: {
        email,
      },
      transaction,
    });
  }
}

export default UserRepository;
