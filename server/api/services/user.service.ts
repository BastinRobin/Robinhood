import L from '../../common/logger';
import DynamoDB from '../../common/db/dynamo.db';
import { User, Auth } from './../../api/models/user';

export class UserService {
  // login(params: Auth): Promise<User> {
  //   L.info(`Authendating user with username ${params.user_name}`);
  //   return Promise.resolve(DynamoDB.login(params));
  // }
}

export default new UserService();
