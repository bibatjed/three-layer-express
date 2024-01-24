import jwt from "jsonwebtoken";
const secret = process.env.SECRET as string;
export async function generateJwt(data: { id: number }) {
  return jwt.sign(
    {
      ...data,
    },
    secret,
    { expiresIn: 60 * 60 }
  );
}

export async function generateRefreshToken(data: { id: number }) {
  return jwt.sign(
    {
      ...data,
    },
    secret,
    { expiresIn: 24 * 60 * 60 }
  );
}

export async function verifyJwt(token: string) {
  return jwt.verify(token, secret);
}
