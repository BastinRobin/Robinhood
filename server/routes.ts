import { Application } from 'express';
import usersRouter from './api/controllers/users/router';
import tenantsRouter from './api/controllers/tenants/router';
import authRouter from './api/controllers/auth/router';
import profileRouter from './api/controllers/profile/router';

export default function routes(app: Application): void {
  app.use('/v1/users', usersRouter);
  app.use('/v1/tenants/', tenantsRouter);
  app.use('/v1/auth/', authRouter);
  app.use('/v1/profile/', profileRouter);
}
