import Connection from './../connections/mondo.db';
import L from '../../common/logger';
import { ObjectID } from 'mongodb';

export class ProfileTypeService {
  async findAll(): Promise<unknown[]> {
    L.info('fetching all profiletypes');
    try {
      return await Connection.db.collection('profiletype').find().toArray();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<unknown> {
    L.info(`fetching profiletype for id ${id}`);
    try {
      return await Connection.db.collection('profiletype').findOne({
        _id: new ObjectID(id),
      });
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: unknown): Promise<unknown> {
    L.info(`creating profiletype`);
    try {
      return await Connection.db.collection('profiletype').insertOne(body);
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
      return await Connection.db
        .collection('profiletype')
        .findOneAndUpdate({ _id: new ObjectID(id) }, { $set: body });
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
      return await Connection.db
        .collection('profiletype')
        .deleteOne({ _id: new ObjectID(id) });
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new ProfileTypeService();
