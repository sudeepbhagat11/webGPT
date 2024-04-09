import jwt, { Secret } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

export const generateToken = (id: string, email: string, expiresIn: string) => {
  const secretKey: Secret = process.env.JWT_SECRET ?? "defaultSecret";
  const payload = { id, email };
  const token = jwt.sign(payload, secretKey, {
    expiresIn,
  });
  return token;
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secretKey: Secret = process.env.JWT_SECRET ?? "defaultSecret";

  const token = req.signedCookies[`jwt`];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  return new Promise<void>((resolve, reject) => {
    //@ts-ignore
    return jwt.verify(token, secretKey, (err, success) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
