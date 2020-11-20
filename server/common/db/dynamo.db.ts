import * as crypto from 'crypto';
import AWS from 'aws-sdk';
import jwt from 'jsonwebtoken';

import { User, Auth, AddUserResponce } from './../../api/models/user';
import { Tenant } from './../../api/models/tenant';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const DB = new AWS.DynamoDB.DocumentClient();

export class DynamoDB {
  AddTenant = async (params: Tenant): Promise<Tenant> => {
    const tenantName = await this.convertToSlug(params.tenant_name.toString());
    const organization = params.organization.toString();
    const email = params.email.toString();
    const dbName = params.db_name.toString();
    const dbPassword = params.db_password.toString();
    const config = JSON.stringify(params.config);
    const isDeleted = params.is_deleted.toString();
    const tenant: Tenant = await this.getTenantByName(tenantName);

    try {
      if (tenant instanceof Error) {
        throw new Error('Something went wrong');
      }

      if (tenant) {
        throw new Error(
          'Unable to create new tenant, tenant name already exist'
        );
      }

      const paramsWrite = {
        TableName: 'tenants',
        Item: {
          tenant_name: tenantName,
          organization: organization,
          email: email,
          db_name: dbName,
          db_password: dbPassword,
          config: config,
          is_deleted: isDeleted,
        },
      };

      const res: unknown = await this.createTenant(paramsWrite);
      if (res instanceof Error) {
        throw new Error('Error while creating new tenant.');
      }
      return params;
    } catch (error) {
      if (error) {
        return error.message;
      }
    }
  };

  registerUser = async (params: User): Promise<AddUserResponce> => {
    console.log('registerUser');
    const userName = params.user_name.toString();
    const email = params.email.toString();
    const password = params.password.toString();
    const encryptionKey = process.env.ENCRYPTION_KEY as string;
    const hash = crypto.createHmac('sha512', encryptionKey).update(password);
    const hashedPass = hash.digest('hex').toString();

    try {
      const user = await this.getUserByUserName(userName);
      console.log('user', user);
      if (user instanceof Error) {
        throw new Error('Something went wrong');
      }
      if (!user) {
        const dbParams = {
          TableName: 'users',
          Item: {
            password: hashedPass,
            email: email,
            user_name: userName,
            date_created: Date().toString(),
            enabled: 1,
          },
        };

        const responce = await this.addUser(dbParams);
        if (responce instanceof Error) {
          throw new Error('Error while creating user.');
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
  };

  login = async (params: Auth): Promise<User> => {
    const userName = params.user_name.toString();
    const password = params.password.toString();
    const encryptionKey = process.env.ENCRYPTION_KEY as string;
    const hash = crypto.createHmac('sha512', encryptionKey).update(password);
    const UserHashedPass = hash.digest('hex').toString();

    try {
      const user: User = await this.getUserByUserName(userName);
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

      const userTenants = await this.getUserTenants(userName);
      return { ...user, auth: true, token, userTenants: userTenants };
    } catch (error) {
      if (error) {
        return error.message;
      }
    }
  };

  getUserByEmail = async (email: string): Promise<User> => {
    const dbParams = {
      TableName: 'users',
      Key: {
        email: email,
      },
    };

    return new Promise((resolve, reject) => {
      DB.get(dbParams, (error, data) => {
        console.log('data.Item', data.Item);
        if (error) {
          reject({ error });
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const user: any = data.Item;
          resolve(user);
        }
      });
    });
  };

  getData = async (
    tableName: string,
    key: string,
    value: string
  ): Promise<User> => {
    const dbParams = {
      TableName: tableName,
      Key: {},
    };
    dbParams.Key[key] = value;
    console.log('dbParams', dbParams);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await DB.get(dbParams).promise();
      return data.Item;
    } catch (err) {
      console.log('Failure', err.message);
    }
  };

  getUserByUserName = async (userName: string): Promise<User> => {
    const dbParams = {
      TableName: 'users',
      Key: {
        user_name: userName,
      },
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await DB.get(dbParams).promise();
      return data.Item;
    } catch (err) {
      console.log('Failure', err.message);
    }
  };

  addUser = async (params): Promise<AddUserResponce> => {
    console.log('adding user', params);
    try {
      await DB.put(params).promise();
      return {
        message: 'Thanks for signing up!',
        data: params.Item,
      };
    } catch (err) {
      console.log('Failure', err);
      return err.message;
    }
  };

  getUserTenants = async (userName: string) => {
    const dbParams = {
      TableName: 'user_tenants',
      IndexName: 'user_name',
      KeyConditionExpression: '#user_name = :v_user_name',
      ExpressionAttributeNames: {
        '#user_name': 'user_name',
      },
      ExpressionAttributeValues: {
        ':v_user_name': userName,
      },
    };

    try {
      const userTenants = [];
      const data = await DB.query(dbParams).promise();
      for (const item of data.Items) {
        const tenant: Tenant = await this.getTenantByName(item.tenant_name);
        delete tenant.db_password;
        delete tenant.db_name;
        if (tenant) userTenants.push(tenant);
      }
      return userTenants;
    } catch (err) {
      console.log('Failure', err);
      return err.message;
    }
  };

  addUserTenant = async (params) => {
    const tenantName = params.tenantName.toString();
    const userName = params.userName.toString();
    const dbParams = {
      TableName: 'user_tenants',
      Item: {
        id: '' + new Date().getTime(),
        tenant_name: tenantName,
        user_name: userName,
      },
    };
    return new Promise((resolve, reject) => {
      DB.put(dbParams, (error, data) => {
        if (error) {
          reject({ message: 'Error while adding user tenant.', error });
        } else {
          resolve({ message: 'User tenant added!', data });
        }
      });
    });
  };

  getTenantByName = async (tenantName: string): Promise<Tenant> => {
    const dbParams = {
      TableName: 'tenants',
      Key: {
        tenant_name: tenantName,
      },
    };

    try {
      console.log('dbParams', dbParams);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await DB.get(dbParams).promise();
      console.log('data', data);
      return data.Item;
    } catch (err) {
      console.log('Failure', err);
      return err.message;
    }
  };

  convertToSlug = async (text: string): Promise<string> => {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  createTenant = async (params: any): Promise<unknown> => {
    try {
      return await DB.put(params).promise();
    } catch (err) {
      console.log('Failure', err);
      return err.message;
    }
  };
}

export default new DynamoDB();
