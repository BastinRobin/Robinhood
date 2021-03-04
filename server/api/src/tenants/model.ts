export interface Tenant {
  id: string;
  tenant_name: string;
  organization: string;
  config: string;
  is_deleted: boolean;
  db_name: string;
  db_user: string;
  db_password: string;
  db_port: string;
  db_host: string;
  email: string;
}
