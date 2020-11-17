import { Request, Response, NextFunction } from 'express';

// Error handler to display the error as HTML
// eslint-disable-next-line no-unused-vars, no-shadow
export default function connectionResolver(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(req.headers['auth_key']);
  console.log(req.headers['auth_token']);
  console.log(req.headers['tsc_id']);
  next();
}
