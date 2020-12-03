import { Application } from 'express';
import usersRouter from './api/controllers/users/router';
import tenantsRouter from './api/controllers/tenants/router';
import employeesRouter from './api/controllers/employees/router';
import accountsRouter from './api/controllers/account/router';

export default function routes(app: Application): void {
  app.use('/v1/users', usersRouter);
  app.use('/v1/tenants/', tenantsRouter);
  app.use('/v1/employees', employeesRouter);
  app.use('/v1/accounts', accountsRouter);
}
