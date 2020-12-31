import L from '../../common/logger';
import DB from '../../common/db/dynamo.db';
import { User, Auth } from './../../api/models/user';
import { TenantService } from './../services/tenant.service';

import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Tenant } from '../models/tenant';

export class AuthService {
  tenantService: TenantService = new TenantService();
  async login(params: Auth): Promise<User> {
    L.info(`Authendating user with username ${params.user_name}`);

    const userName = params.user_name;
    const email = params.email;
    const password = params.password.toString();
    const encryptionKey = process.env.ENCRYPTION_KEY as string;
    const hash = crypto.createHmac('sha512', encryptionKey).update(password);
    const UserHashedPass = hash.digest('hex').toString();

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let user: any = '';
      if (userName) {
        user = await DB.find('users', { user_name: userName });
      }

      if (email) {
        user = await DB.findBy(
          'users',
          '#email = :v_email',
          {
            '#email': 'email',
          },
          {
            ':v_email': email,
          },
          'email'
        );
        if (user && user.length > 0) {
          user = user[0];
        } else {
          throw new Error('User not exist.');
        }
      }
      if (user instanceof Error) {
        throw new Error('Something went wrong');
      }

      if (!user) {
        throw new Error('User not exist.');
      }

      if (!user.enabled) {
        throw new Error('User disabled please contact administrator');
      }

      if (user.password !== UserHashedPass) {
        throw new Error('Invalid username or password');
      }

      const token = jwt.sign(user, encryptionKey, {});

      const userTenants = [];
      const userTenant: any = await DB.findBy(
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
      console.log('userTenant', userTenant);
      if (userTenant) {
        for (const item of userTenant.Items) {
          const tenant: any = await DB.find('tenants', {
            tenant_id: item.tenant.id,
          });
          delete tenant.db_password;
          delete tenant.db_name;
          if (tenant) userTenants.push(tenant);
        }
      }
      return { ...user, auth: true, token, user_tenants: userTenants };
    } catch (error) {
      if (error) {
        return error.message;
      }
    }
  }

  async clientSignup(params: any): Promise<string[]> {
    L.info(`Signing up new client with username ${params.user_name}`);
    const organization = params.organization;
    const dbUser = params.db_user;
    const dbPassword = params.db_password;
    const dbPort = params.db_port;
    const dbHost = params.db_host;
    const userName = params.user_name;
    const email = params.email;
    const config = JSON.stringify(params.config);
    const isDeleted = params.is_deleted;
    const password = params.password;
    const encryptionKey = process.env.ENCRYPTION_KEY as string;
    const hash = crypto.createHmac('sha512', encryptionKey).update(password);
    const hashedPass = hash.digest('hex').toString();
    try {
      const tenantParams = {
        organization,
        email,
        db_user: dbUser,
        db_password: dbPassword,
        db_port: dbPort,
        db_host: dbHost,
        config,
        is_deleted: isDeleted,
      };
      const tenant: any = await this.tenantService.create(tenantParams);
      console.log('tenant', tenant);
      if (tenant instanceof Error) {
        throw new Error('Something went wrong');
      }
      const user = await DB.find('users', { user_name: userName });
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

        const responce = await DB.create('users', dbUserParams);
        if (responce instanceof Error) {
          throw new Error('Error while creating user.');
        }

        const dbUserTenantParams = {
          id: new Date().getTime(),
          user_id: dbUserParams.id,
          tenant_id: tenant.id,
          date_created: Date().toString(),
        };

        const userTenant = await DB.create('user_tenants', dbUserTenantParams);

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

  async carerSignup(params: any): Promise<string[]> {
    L.info(`Signing up new carer with username ${params.user_name}`);
    const slug = params.slug;
    const userName = params.user_name;
    const email = params.email;
    const password = params.password;
    const encryptionKey = process.env.ENCRYPTION_KEY as string;
    const hash = crypto.createHmac('sha512', encryptionKey).update(password);
    const hashedPass = hash.digest('hex').toString();
    try {
      const tenant: any = await DB.find('tenants', { tenant_name: slug });
      if (tenant instanceof Error) {
        throw new Error('Something went wrong');
      }

      const user: any = await DB.find('users', { user_name: userName });
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

        const responce = await DB.create('users', dbUserParams);
        if (responce instanceof Error) {
          throw new Error('Error while creating user.');
        }

        const dbUserTenantParams = {
          id: new Date().getTime(),
          user_id: +dbUserParams.id,
          tenant_id: tenant.id,
          date_created: Date().toString(),
        };

        const userTenant = await DB.create('user_tenants', dbUserTenantParams);

        if (userTenant instanceof Error) {
          throw new Error('Error while creating user tenant.');
        }
        return responce;
      } else {
        // User already exist need to add new user tenant
        const dbUserTenantParams = {
          id: new Date().getTime(),
          user_id: +user.id,
          tenant_id: tenant.id,
          date_created: Date().toString(),
        };

        await DB.create('user_tenants', dbUserTenantParams);
        return user;
      }
    } catch (error) {
      if (error) {
        return error.message;
      }
    }
  }
}

export default new AuthService();
