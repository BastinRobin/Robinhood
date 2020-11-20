export interface User {
  user_name: string;
  password?: string;
  date_created: Date;
  email: string;
  enabled: boolean;
  auth?: boolean;
  token?: string;
  userTenants?: unknown;
}

export interface Auth {
  user_name: string;
  password: string;
}

export interface AddUserResponce {
  message: string;
  data: User;
}
