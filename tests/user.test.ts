import { Transaction } from "sequelize";
import { IRepository } from "../src/repository";
import UserService from "../src/services/user/User";
import { IUserService } from "../src/controllers/User";
import { ZodError } from "zod";

describe("User Service", () => {
  describe("User Registration", () => {
    describe("User Registration Validation", () => {
      let userService: IUserService;
      beforeAll(() => {
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
        userService = new UserService(repository);
      });
      it("should throw an error if user pass an empty object or none", async () => {
        try {
          //@ts-expect-error
          await userService.register({});
        } catch (e) {
          if (e instanceof ZodError) {
            const errors = e.flatten().fieldErrors;
            expect(errors).toMatchObject({
              email: ["Required"],
              password: ["Required"],
              firstName: ["Required"],
              lastName: ["Required"],
            });
          }
        }
      });

      it("should throw an error if user pass invalid email", async () => {
        try {
          await userService.register({ email: "invalid-email", firstName: "hello", lastName: "hellotry", password: "12345678", middleName: "" });
        } catch (e) {
          if (e instanceof ZodError) {
            const errors = e.flatten().fieldErrors;
            expect(errors).toMatchObject({
              email: ["Invalid email"],
            });
          }
        }
      });

      it("should throw an error if user pass invalid email", async () => {
        try {
          await userService.register({ password: "12", email: "validemail@gmail.com", firstName: "hello", lastName: "hello", middleName: "" });
        } catch (e) {
          if (e instanceof ZodError) {
            const errors = e.flatten().fieldErrors;
            expect(errors).toMatchObject({
              password: ["String must contain at least 8 character(s)"],
            });
          }
        }
      });
    });
  });
});
