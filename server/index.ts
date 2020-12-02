import './common/env';
import 'reflect-metadata';
import Server from './common/server';
import routes from './routes';

const port = parseInt(process.env.PORT);
export default new Server().router(routes).listen(port);
