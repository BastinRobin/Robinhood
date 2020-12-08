import { Connection } from './../connections/connection';
import L from '../../common/logger';
import { Profile } from './../models/profile';

export class ProfileService {
  findAll(): Promise<Profile[]> {
    L.info('fetching all profiles');
    return Connection.then(async (connection) => {
      const profiles: Profile[] = await connection.manager.find(Profile);
      return profiles;
    }).catch((error) => {
      L.error('Error ', error);
      return error;
    });
  }

  findById(id: number): Promise<Profile> {
    L.info(`fetching profile for id ${id}`);
    return Connection.then(async (connection) => {
      const profile: Profile = await connection.manager.findOne(Profile, id);
      return profile;
    }).catch((error) => {
      L.error('Error ', error);
      return error;
    });
  }

  create(body: Profile): Promise<Profile> {
    L.info(`creating profile`);
    return Connection.then(async (connection) => {
      try {
        const profile: Profile = await connection.manager
          .create(Profile, body)
          .save();
        return profile;
      } catch (error) {
        if (error) {
          L.error('Error ', error);
          return error.message;
        }
      }
    }).catch((error) => {
      L.error('Error ', error);
      return error;
    });
  }

  update(body: Profile, id: number): Promise<Profile> {
    L.info(`updating profile for id ${id}`);
    return Connection.then(async (connection) => {
      const profile = await connection.manager.update(Profile, id, body);
      return profile;
    }).catch((error) => {
      L.error('Error ', error);
      return error;
    });
  }

  deleteById(id: number): Promise<Profile> {
    L.info(`deleting profile for id ${id}`);
    return Connection.then(async (connection) => {
      const profile = await connection.manager.delete(Profile, id);
      return profile;
    }).catch((error) => {
      L.error('Error ', error);
      return error;
    });
  }
}

export default new ProfileService();
