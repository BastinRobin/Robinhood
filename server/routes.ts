import { Application } from 'express';
import usersRouter from './api/controllers/users/router';
import tenantsRouter from './api/controllers/tenants/router';
import authRouter from './api/controllers/auth/router';

export default function routes(app: Application): void {
<<<<<<< HEAD
  app.use('/api/v1/users', usersRouter);
  app.use('/tenants/', tenantsRouter);
  app.use('/auth/', authRouter);
=======
  app.use('/v1/users', usersRouter);
  app.use('/v1/tenants/', tenantsRouter);
>>>>>>> 993bf0c61200d62871f3a2ada948efd3f7b138e1
}
