import L from '../../common/logger';
import DynamoDB from '../../common/db/dynamo.db';
import { Tenant } from './../../api/models/tenant';

export class TenantService {
  create(params: Tenant): Promise<Tenant> {
    L.info(`Creating new tenant with name ${params.tenant_name}`);
    return Promise.resolve(DynamoDB.AddTenant(params));
  }
}

export default new TenantService();
