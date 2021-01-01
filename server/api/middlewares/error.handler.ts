import { Response } from 'express';

// Error handler to display the error message
export default function errorHandler(err, res: Response) {
  res.status(err.status || 500);
  res.send({ status: err.status || 500, message: err.message });
}
