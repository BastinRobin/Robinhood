import { Application } from 'express';
import usersRouter from './api/controllers/users/router';
import tenantsRouter from './api/controllers/tenants/router';

export default function routes(app: Application): void {
  app.use('/api/v1/users', usersRouter);
  app.use('/tenants/', tenantsRouter);
}
