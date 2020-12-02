import L from '../../common/logger';
import DB from '../../common/db/dynamo.db';
import { Tenant } from './../../api/models/tenant';
import { CommonService } from './../services/common.service';

export class TenantService {
  async create(params: any): Promise<Tenant> {
    L.info(`Creating new tenant with name ${params.tenant_name}`);
    const tenantName = await CommonService.convertToSlug(
      params.organization.toString()
    );
    const organization = params.organization.toString();
    const email = params.email.toString();
    const dbName = tenantName;
    const dbUser = params.db_user;
    const dbPassword = params.db_password;
    const dbPort = params.db_port;
    const dbHost = params.db_host;
    const config = JSON.stringify(params.config);
    const isDeleted = params.is_deleted;
    const tenant: any = await DB.find('tenants', {
      tenant_name: tenantName,
    });

    try {
      if (tenant instanceof Error) {
        throw new Error('Something went wrong');
      }

      if (tenant) {
        throw new Error(
          'Unable to create new tenant, tenant name already exist'
        );
      }

      const dbParams = {
        id: '' + new Date().getTime(),
        tenant_name: tenantName,
        organization: organization,
        email: email,
        db_name: dbName,
        db_user: !dbUser ? process.env.DB_USER : dbUser,
        db_password: !dbPassword ? process.env.DB_PASSWORD : dbPassword,
        db_port: !dbPort ? process.env.DB_PORT : dbPort,
        db_host: !dbHost ? process.env.DB_HOST : dbHost,
        config: config,
        is_deleted: isDeleted,
      };

      const res: unknown = await DB.create('tenants', dbParams);
      if (res instanceof Error) {
        throw new Error('Error while creating new tenant.');
      }
      return dbParams;
    } catch (error) {
      if (error) {
        return error.message;
      }
    }
  }

  async find(tenantName: string): Promise<string[]> {
    L.info(`Fetching ${tenantName} details`);
    return Promise.resolve(DB.find('tenants', { tenant_name: tenantName }));
  }

  async findAll(): Promise<string[]> {
    L.info(`Fetching all tenants`);
    return Promise.resolve(DB.findAll('tenants'));
  }

  async delete(tenantName: string): Promise<string[]> {
    L.info(`Fetching ${tenantName} details`);
    return Promise.resolve(DB.delete('tenants', { tenant_name: tenantName }));
  }

  async convertToSlug(text: string): Promise<string> {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}

export default new TenantService();
