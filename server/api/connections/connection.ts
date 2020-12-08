import { createConnection } from 'typeorm';
export const Connection = createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'qwerty123',
  database: 'careHome',
  entities: [__dirname + '/../models/*{.js,.ts}'],
  migrations: [__dirname + '/../migrations/*{.js,.ts}'],
  synchronize: true,
  logging: false,

  // type: 'mongodb',
  // host: 'localhost',
  // port: 27017,
  // database: 'test',
  // synchronize: true,
  // logging: false,
  // entities: [__dirname + '/../models/*{.js,.ts}'],
  // migrations: [__dirname + '/../migrations/*{.js,.ts}'],
});
