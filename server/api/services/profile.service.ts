import Connection from './../connections/mondo.db';
import L from '../../common/logger';
import { ObjectID } from 'mongodb';

export class ProfileService {
  async findAll(): Promise<unknown[]> {
    L.info('fetching all profiles');
    try {
      const profiles: unknown[] = await Connection.db
        .collection('profile')
        .find()
        .toArray();
      return profiles;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<unknown> {
    L.info(`fetching profile for id ${id}`);
    try {
      const profiles: unknown = await Connection.db
        .collection('profile')
        .findOne({
          _id: new ObjectID(id),
        });
      return profiles;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: any): Promise<unknown> {
    L.info(`creating profile`);
    try {
      body.profile_type = {
        $ref: 'profiletype',
        $id: new ObjectID(body.profile_type_id),
      };
      const profile: unknown = await Connection.db
        .collection('profile')
        .insertOne(body);
      return profile;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: unknown, id: string): Promise<unknown> {
    L.info(`updating profile for id ${id}`);
    try {
      const profile: unknown = await Connection.db
        .collection('profile')
        .findOneAndUpdate({ _id: new ObjectID(id) }, { $set: body });
      return profile;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<unknown> {
    L.info(`deleting profile for id ${id}`);
    try {
      const profile: unknown = await Connection.db
        .collection('profile')
        .deleteOne({ _id: new ObjectID(id) });
      return profile;
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new ProfileService();
