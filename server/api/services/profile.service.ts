import { CreateQuery } from 'mongoose';
import Profile, { IProfile } from './../models/profile';
import L from '../../common/logger';
export class ProfileService {
  async findAll(): Promise<IProfile[]> {
    L.info('fetching all addresstypes');
    try {
      return await Profile.find().populate('profile_type');
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IProfile> {
    L.info(`fetching addresstype for id ${id}`);
    try {
      return await (await Profile.findById(id))
        .populate('profile_type')
        .execPopulate();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IProfile>): Promise<IProfile> {
    L.info(`creating addresstype`);
    try {
      return await Profile.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IProfile>, id: string): Promise<IProfile> {
    L.info(`updating addresstype for id ${id}`);
    try {
      return await Profile.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IProfile> {
    L.info(`deleting addresstype for id ${id}`);
    try {
      return await Profile.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new ProfileService();
