export interface Tenant {
  tenant_name: string;
  organization: string;
  config: string;
  is_deleted: boolean;
  db_name: string;
  db_password: string;
  email: string;
}
