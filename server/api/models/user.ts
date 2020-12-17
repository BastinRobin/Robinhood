export interface User {
  id: number;
  user_name: string;
  password?: string;
  date_created: Date;
  email: string;
  enabled: boolean;
  auth?: boolean;
  token?: string;
  userTenants?: unknown;
  tenant_id?: string;
}

export interface Auth {
  user_name?: string;
  email?: string;
  password: string;
}

export interface AddUserResponce {
  message: string;
  data: User;
}
