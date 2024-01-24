import { Transaction } from "sequelize";
import { IRepository } from "../src/repository";

export default function initRepositoryMock() {
  const repository: IRepository = {
    startTransaction: (callback) => {
      return Promise.resolve(callback({} as Transaction));
    },
    user: {
      findUserByEmail: jest.fn(),
      registerUser: jest.fn(),
      findUserById: jest.fn(),
    },
  };

  return repository;
}
