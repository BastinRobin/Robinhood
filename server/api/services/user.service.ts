import L from '../../common/logger';
import DynamoDB from '../../common/db/dynamo.db';
import { User } from './../../api/models/user';

import * as crypto from 'crypto';

export class UserService {
  async create(params: User): Promise<string[]> {
    L.info(`Signing up new user with username ${params.user_name}`);
    const userName = params.user_name.toString();
    const email = params.email.toString();
    const password = params.password.toString();
    const encryptionKey = process.env.ENCRYPTION_KEY as string;
    const hash = crypto.createHmac('sha512', encryptionKey).update(password);
    const hashedPass = hash.digest('hex').toString();
    try {
      const user = await DynamoDB.find('users', { user_name: userName });
      if (user instanceof Error) {
        throw new Error('Something went wrong');
      }

      if (!user) {
        const dbUserParams = {
          id: '' + new Date().getTime(),
          password: hashedPass,
          email: email,
          user_name: userName,
          date_created: Date().toString(),
          enabled: 1,
        };

        const responce = await DynamoDB.create('users', dbUserParams);
        if (responce instanceof Error) {
          throw new Error('Error while creating user.');
        }
      } else {
        throw new Error(
          'Unable to add user, because the userName, and or, email address is already associated with an existing account.'
        );
      }
    } catch (error) {
      if (error) {
        return error.message;
      }
    }
  }

  async find(userName: string): Promise<string[]> {
    L.info(`Fetching ${userName} details`);
    return Promise.resolve(DynamoDB.find('users', { user_name: userName }));
  }

  async findAll(): Promise<string[]> {
    L.info(`Fetching all users`);
    return Promise.resolve(DynamoDB.findAll('users'));
  }

  async delete(userName: string): Promise<string[]> {
    L.info(`Fetching ${userName} details`);
    return Promise.resolve(DynamoDB.delete('users', { user_name: userName }));
  }
}

export default new UserService();
