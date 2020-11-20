import L from '../../common/logger';
import DynamoDB from '../../common/db/dynamo.db';
import { User, Auth, AddUserResponce } from './../../api/models/user';

export class AuthService {
  login(params: Auth): Promise<User> {
    L.info(`Authendating user with username ${params.user_name}`);

    return Promise.resolve(DynamoDB.login(params));
  }

  signup(params: User): Promise<AddUserResponce> {
    L.info(`Signing up new user with username ${params.user_name}`);

    return Promise.resolve(DynamoDB.registerUser(params));
  }
}

export default new AuthService();
