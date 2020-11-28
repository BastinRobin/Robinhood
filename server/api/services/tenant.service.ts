import L from '../../common/logger';
import DynamoDB from '../../common/db/dynamo.db';
import { Tenant } from './../../api/models/tenant';

export class TenantService {
  async create(params: Tenant): Promise<Tenant> {
    L.info(`Creating new tenant with name ${params.tenant_name}`);
    const tenantName = await this.convertToSlug(params.tenant_name.toString());
    const organization = params.organization.toString();
    const email = params.email.toString();
    const dbName = params.db_name.toString();
    const dbUser = params.db_user.toString();
    const dbPassword = params.db_password.toString();
    const dbPort = params.db_port.toString();
    const dbHost = params.db_host.toString();
    const config = JSON.stringify(params.config);
    const isDeleted = params.is_deleted;
    const tenant: any = await DynamoDB.find('tenants', {
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
        db_user: dbUser,
        db_password: dbPassword,
        db_port: dbPort,
        db_host: dbHost,
        config: config,
        is_deleted: isDeleted,
      };

      const res: unknown = await DynamoDB.create('tenants', dbParams);
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
    return Promise.resolve(
      DynamoDB.find('tenants', { tenant_name: tenantName })
    );
  }

  async findAll(): Promise<string[]> {
    L.info(`Fetching all tenants`);
    return Promise.resolve(DynamoDB.findAll('tenants'));
  }

  async delete(tenantName: string): Promise<string[]> {
    L.info(`Fetching ${tenantName} details`);
    return Promise.resolve(
      DynamoDB.delete('tenants', { tenant_name: tenantName })
    );
  }

  async convertToSlug(text: string): Promise<string> {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
}

export default new TenantService();
