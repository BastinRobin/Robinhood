import { Application } from 'express';
import usersRouter from './api/src/users/router';
import authRouter from './api/src/auth/router';

export default function routes(app: Application): void {
  app.use('/v1/users', usersRouter);
  app.use('/v1/auth/', authRouter);
}
