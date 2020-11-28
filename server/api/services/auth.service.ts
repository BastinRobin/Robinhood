import L from '../../common/logger';
import DynamoDB from '../../common/db/dynamo.db';
import { User, Auth } from './../../api/models/user';

import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';

export class AuthService {
  async login(params: Auth): Promise<User> {
    L.info(`Authendating user with username ${params.user_name}`);

    const userName = params.user_name.toString();
    const password = params.password.toString();
    const encryptionKey = process.env.ENCRYPTION_KEY as string;
    const hash = crypto.createHmac('sha512', encryptionKey).update(password);
    const UserHashedPass = hash.digest('hex').toString();

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: any = await DynamoDB.find('users', { user_name: userName });
      if (user instanceof Error) {
        throw new Error('Something went wrong');
      }

      if (!user) {
        throw new Error('User not exist.');
      }

      if (user.password !== UserHashedPass) {
        throw new Error('Invalid username or password');
      }

      const token = jwt.sign(user, encryptionKey, {
        expiresIn: '30m', // expires in 24 hours
      });

      const userTenants = [];
      const userTenant: any = await DynamoDB.findBy(
        'user_tenants',
        '#user_id = :v_user_id',
        {
          '#user_id': 'user_id',
        },
        {
          ':v_user_id': user.id,
        },
        'user_id'
      );
      for (const item of userTenant.Items) {
        const tenant: any = await DynamoDB.find('tenants', {
          tenant_id: item.tenant.id,
        });
        delete tenant.db_password;
        delete tenant.db_name;
        if (tenant) userTenants.push(tenant);
      }
      return { ...user, auth: true, token, user_tenants: userTenants };
    } catch (error) {
      if (error) {
        return error.message;
      }
    }
  }

  async signup(params: User): Promise<string[]> {
    L.info(`Signing up new user with username ${params.user_name}`);
    const userName = params.user_name.toString();
    const email = params.email.toString();
    const tenantId = params.tenant_id.toString();
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

        const dbUserTenantParams = {
          id: new Date().getTime(),
          user_id: +dbUserParams.id,
          tenant_id: tenantId,
          date_created: Date().toString(),
        };

        const userTenant = await DynamoDB.create(
          'user_tenants',
          dbUserTenantParams
        );

        if (userTenant instanceof Error) {
          throw new Error('Error while creating user tenant.');
        }
        return responce;
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
}

export default new AuthService();
