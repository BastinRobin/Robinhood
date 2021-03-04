import L from '../../../common/logger';
import DB from '../../../common/db/dynamo.db';
import { User, Auth } from '../users/model';
import { Tenant } from '../tenants/model';
import { TenantService } from '../tenants/service';

import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';

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
        for (const item of userTenant) {
          const tenant: any = await DB.findBy(
            'tenants',
            '#id = :v_id',
            {
              '#id': 'id',
            },
            {
              ':v_id': item.tenant_id,
            },
            'id-index'
          );
          if (tenant && tenant.length > 0) {
            delete tenant[0].db_password;
            delete tenant[0].db_name;
            userTenants.push(tenant[0]);
          }
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

  async generateJWT(userId: string, email: string): Promise<any> {
    const payload = {
      sub: userId, // Unique user id string
      name: email,
      exp: Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes expiration
    };
    const privateKey = `
-----BEGIN PRIVATE KEY-----
MIIJQwIBADANBgkqhkiG9w0BAQEFAASCCS0wggkpAgEAAoICAQCWUzmBI5zGcriA
9Fj+XpukNDXu6k8nb1sFxv8EU3f+mdCbPHoAnTJHFjEKs8H+q6iXUtG486WqaS8s
EaW2X4FwmoH6ng0RsUxkgWhL8HG05lkFbmSNDClIp9BGSIoqnTSI4U6uvxE0Ywx4
IycEFWjwTTeIv9nE0GTgbhvPXsd1aZSHqNAv+ceL7SRMvbFB0OZvfp1IMS3qzaZs
jH2HexybtBMslDiHzwXU1rlPbjwbdPStxjaNmqEhwPmbyJlU4l9Nm7nPYxckIzxf
UL0LiSbPfa9WrhkazDR3jFuPJeyuPT2sFupc+1q5XtYztQOx4tZPjhfO6qNVkHOW
CjaScrmU9VUUV1u52/aLCAmc4GEcLxxp3cn567W2k8nFYOpz2IXIK19ZLms2DrIM
YcamTBFJskKFg9YeygbbiJLuqzdk6vOjk6GPl3ibxF8IUicU1e/3i7rYvNNZuXQC
fTBdY525DYQVyCCau7DrpmV+Dsplf+ukAEDYxyyMaxoK0cE13AKBxZyBf5RDdEtR
J4nxwO6AxFXL5RGhHZ26R/WxQlve8tiLVF3W3rRGmBPzBHDoZWXKfLtRU3NQDvkY
nozfZm6GBaxgN0QnZXE7zyFvVtS3qk1QBaqDsSFeDy/57ZcWuFXj13s157SsYZJM
AHXK1OeSGx75NkRdI/araR3fvFbqrQIDAQABAoICAEB1vo5UPYlRLzHI1ZJ58iam
5sukuL1xwCfJjZgGzMklnvC6LZyuy5z09KGgtFqmtDvzXRAAlnTs9rfgd10tNf2Z
m4vikzsXemkMnrMVj0Shk+HC1SYwZVGM+D/zIiAk2h6p8on3T4LVyEaJ2FSlc6K7
kck3b0O4ktE0FgPFoiUEWZcUefVgl8M2NJ8dpnFRCUcdFYeb4xMxDSC126wpS/qu
bJxskJMX4GnEi6D2ZZrme3c6rDDrchXdwIsfKTTffztxv+sglA9AdsZugin8rWJD
BFlYfVZi40qyKp7HBecvRo9RIj0t4VjkxFhW0hdI7Fof1bC6J8DsmMvpZD5HKLGB
gFe/RVdqFQqyCHDkLKX0EXzkan7rLk2mlsO0We2gVVTuLYzSYqnryrmt6yPZlGfp
1UeFXwednNCAmdGAHzuylU0zaiy3ArU9Eef39EACPe4j8s5prOHgcyj8TL7WVQjE
GRSG6tcHy2F+rpXmoH4cU8vXMavm+Ghg004vx/tJAE65X0/RMZw82/E/0cWmVnUZ
QKvob/S5CLMfFuxRgqxRAR1hqWFdpicO+Pr+WYiXNmcT9QyVc6Xahr+MGSg+lD0O
NaLhPECZOkeDRmP+HRoX0HFyMA8atzk+92i52O0TjnP7qIJH1XM4uWHKdrVqS5Ao
ax6T6BMoBQvcgMGLZWfnAoIBAQDHemXnjDi+PgAOiqr0XHX5wFaNrwGpC7x38RPE
FKuCtr5vOq8fIhO0TUF/5CGNPaX1YDeCD9k8+yfi+6vGIzfw7YsWlM7eOY3bJYjA
iT+Hj60ZU6sflmoZODSBejloWD0SmHVNi7u9e/nGXNf6ziOuMdYNSDGPAMNUSVaY
l82ODgbmHORWZJs8n1mFofu5FZxBBGxx6bFkYRTzTCa6XdlzJ/xiM55XVvXTVx9u
KCWXmueu6ZEtTcxPVHPShuyPxPXnGNLkfjqx/kqhqtqXXZHUcDpC3zNbVRDBB57l
YOKLu3cBfGhymRkCq0lmAw+NmMM1++iUdsnaxpAgDmqZ5sqHAoIBAQDA62ZOfwwn
veIQvNAcZyiIGz97MuuQj9o5+hh/up9tMqJrWeVN0pW1DNvR97WZA+8I7INkT8VP
f3k0nvQPyopld0da3Orod1XOKK+1lDIZqh2HbHjZjdB5ESLiXeG+3hAp0Uybi6Xu
B3VaJDfJjEkQHPXA0ZvlHxHsDbSqEEA8ipRyRBq0G1pFsIxkldIltQ1FhDh99OF2
ddj6n5upicIlYO27gWczeZEW8QPkSxNHk974XA4q2qLg9v0NIbBAGub6pY+MFscP
h26HTCor0U/UvP6P9oyn49UKMdm6tztJ9oDy3jRqIO+k1vawgcEV+I9NPz2fqTD+
UKRsjx9SUWorAoIBAEtZFXMACVL68mSLxoVlA38iQs9j4pmrADbCDjhLonlOc+Jp
5Uo6Qf0iDXK0hmPmfHCSNoVfXSxmpitb6wd9uBy+bYJLFVTlooq7w8sOTLv07mqZ
qxLUayE5lMOvmk2qvu7uPajb9j9du/xMh5yKDvo2gucjdOzSWfXVeetLs+5LqBl1
ol5rxCODAXqzs/S2j/4TIK9qmYIUFajNA/fziTaxTOj/HHlbNKHuz8V5TrHUZl0w
hpD5SQpSGSnVozevKz9upgJ/F8ayChjFA6qXQoVfGvK1gp2mJRz0tvVnwksLtakP
CBj5cXQLpT7uOwq+QEZ8795cfGSyCjDBoUye27MCggEBAJ7XMv0ejhuKtD+jtpYs
OasXBEWjv2DfkIZ77P/94JZAQoqxEaPp52mSlMtkcRjzrDRkyConpAW4p0s0NS9r
TFgOxamCi8erufJsfX+77SREdNuz7Cz0HtoPyfEn618D57sGoVTQvmYlrfHyMBy6
bM3filigPQOBeXgqML51cu5mC6Opf3Mbsk/+9Rk8YjK5x5udKgZLQfgPP//auof0
7O1pyVPBT/+J8HQ7LUEir1UX41YKNYADVGh19BSD0GJ3xAZLms11U6DtmYu8olxB
ksFOeyp9jYIOjLJAKU0a4K4dUD6nxfA7/hRzCdp6e0hjx1mK4Go9HCHItBjOHrPg
ZNECggEBALH6XAx1j5HvLbVi7p4QbmCwXZZZqXFpIB1U0UhM0qNZEFHwmxc0XWzF
pYmrpMVOtqhX74eZhRs6g6arDdhMa9PGwhA1qgwve59WycBDo2bRh05L2r8w3rHx
XbKTJMK72fSzkEGuO7fOmNXTn1V2Ie3b2tpM/JmsF8WMjEJOqkNs3GsTo2z4RXVM
ZeTPp9HhvmI8UAhpfKP/dSozEh7+BcA50RjODyicwxcKCCPT0x64nBueuqMK8pdl
1Yk3+kIGhnj7wDLlpqIfvtLwHsh6rTIe0+zPnvu/oNwaN6qyneLh1fqetI/NwFZs
RA2ZrDShmE9L94KCrKiDUdRMayKhzDY=
-----END PRIVATE KEY-----`;
    try {
      const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
      return { token };
    } catch (e) {
      if (e) {
        return e.message;
      }
    }
  }
}

export default new AuthService();
