import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const VerifyJWTMiddleware = (
  request: Request,
  response: Response,
  next: any
) => {
  const token = (request.headers && request.headers.token) as string;
  const encryptionKey = process.env.ENCRYPTION_KEY as string;
  if (!token) {
    response.status(400).json({ message: 'Invalid auth token provided.' });
  }

  jwt.verify(token, encryptionKey, (err: any, decoded: any) => {
    if (err || !decoded) {
      response.status(400).json({ message: 'Invalid auth token provided.' });
    }
    next();
  });
};
