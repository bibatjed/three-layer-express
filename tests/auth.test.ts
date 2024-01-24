import { IAuthService } from "../src/controllers/Auth";
import { IRepository } from "../src/repository";
import ErrorService from "../src/services/ErrorService";
import AuthService from "../src/services/auth/Auth";
//@ts-ignore
import initRepositoryMock from "./repository.mock";
import { generateJwt, generateRefreshToken } from "../src/jwt";
import { ZodError } from "zod";

jest.mock("../src/jwt");

describe("Auth Service", () => {
  describe("Login", () => {
    let authService: IAuthService;
    let repository: IRepository;
    beforeAll(() => {
      repository = initRepositoryMock();
      authService = new AuthService(repository);
    });

    describe("Login Positive Path", () => {
      it("should generate a jwt token and refresh token", async () => {
        (repository.user.findUserByEmail as jest.Mock).mockResolvedValueOnce({
          id: 1,
          comparePassword: async () => {
            return true;
          },
        });

        (generateJwt as jest.Mock).mockImplementationOnce(async () => "sample-token");
        (generateRefreshToken as jest.Mock).mockImplementationOnce(async () => "sample-refresh-token");
        const result = await authService.login({ email: "hello@gmail.com", password: "123456789" });
        expect(result).toMatchObject({
          message: "Success",
          jwt: "sample-token",
          refreshToken: "sample-refresh-token",
        });
      });
    });

    describe("Login Server Side Validation", () => {
      it("should throw an error if user is not found", async () => {
        try {
          (repository.user.findUserByEmail as jest.Mock).mockResolvedValueOnce(null);
          await authService.login({ email: "hello@gmail.com", password: "123456789" });
        } catch (e) {
          if (e instanceof ErrorService) {
            expect(e).toMatchObject({ status: 400, message: "Invalid email or password" });
          }
        }
      });

      it("should throw an error if password is not the same", async () => {
        try {
          (repository.user.findUserByEmail as jest.Mock).mockResolvedValueOnce({
            id: 1,
            comparePassword: async () => {
              return false;
            },
          });
          await authService.login({ email: "hello@gmail.com", password: "123456789" });
        } catch (e) {
          if (e instanceof ErrorService) {
            expect(e).toMatchObject({ status: 400, message: "Invalid email or password" });
          }
        }
      });
    });
    describe("Login Client Validation", () => {
      it("should throw an error if user pass an empty object or none", async () => {
        try {
          //@ts-expect-error
          await authService.login({});
        } catch (e) {
          if (e instanceof ZodError) {
            const errors = e.flatten().fieldErrors;
            expect(errors).toMatchObject({
              email: ["Required"],
              password: ["Required"],
            });
          }
        }
      });
    });

    it("should throw an error if user pass invalid email", async () => {
      try {
        await authService.login({ email: "invalid-email", password: "12345678" });
      } catch (e) {
        if (e instanceof ZodError) {
          const errors = e.flatten().fieldErrors;
          expect(errors).toMatchObject({ email: ["Invalid email"] });
        }
      }
    });

    it("should throw an error if user pass invalid password", async () => {
      try {
        await authService.login({ email: "email@gmail.com", password: "1234567" });
      } catch (e) {
        if (e instanceof ZodError) {
          const errors = e.flatten().fieldErrors;
          expect(errors).toMatchObject({ password: ["String must contain at least 8 character(s)"] });
        }
      }
    });
  });
});
