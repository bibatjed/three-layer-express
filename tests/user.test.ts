import { IRepository } from "@src/repository";
import UserService from "@src/services/user/User";
import { IUserService } from "@src/controllers/User";
import ErrorService from "@src/utils/ErrorService";
//@ts-ignore
import initRepositoryMock from "./repository.mock";

import { ZodError } from "zod";

describe("User Service", () => {
  describe("User Registration", () => {
    let userService: IUserService;
    let repository: IRepository;
    beforeAll(() => {
      repository = initRepositoryMock();
      userService = new UserService(repository);
    });

    describe("User Registration Positive Path", () => {
      it("should return success message after user registration", async () => {
        const result = await userService.register({ email: "registered@gmail.com", password: "12345678", firstName: "hello", lastName: "hello", middleName: "" });
        expect(result).toMatchObject({ message: "User is registered" });
      });
    });

    describe("User Registration Server Validation", () => {
      it("should throw an error if user is already registered", async () => {
        try {
          (repository.user.findUserByEmail as jest.Mock).mockResolvedValueOnce({ id: "1" });
          await userService.register({ email: "registered@gmail.com", password: "12345678", firstName: "hello", lastName: "hello", middleName: "" });
        } catch (e) {
          if (e instanceof ErrorService) {
            expect(e).toMatchObject({
              status: 409,
              message: "User is already registered",
            });
          }
        }
      });
    });

    describe("User Registration Client Validation", () => {
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
