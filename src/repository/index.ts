import { Transaction } from "sequelize";
import UserRepository, { IUserRepository } from "./User";
import sequelize from "../db";

export interface IRepository {
  startTransaction: typeof startTransaction;
  user: IUserRepository;
}
type callbacked<T> = (t: Transaction) => Promise<T>;
function startTransaction<T>(callback: callbacked<T>) {
  return sequelize.transaction(callback);
}

export default function initializeRepository() {
  const repository: IRepository = {
    startTransaction: startTransaction,
    user: new UserRepository(),
  };

  return repository;
}
