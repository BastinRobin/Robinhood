import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function VerifyJWTMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const token = (request.headers && request.headers.token) as string;
  const encryptionKey = process.env.ENCRYPTION_KEY as string;
  if (!token) {
    response.status(400).json({ message: 'Invalid auth token provided.' });
  }

  jwt.verify(token, encryptionKey, (err, decoded) => {
    if (err || !decoded) {
      response.status(400).json({ message: 'Invalid auth token provided.' });
    }
    next();
  });
}
