import { CreateQuery } from 'mongoose';
import ProfileType, { IProfileType } from './../models/profiletype';
import L from '../../common/logger';
export class ProfileTypeService {
  async findAll(): Promise<IProfileType[]> {
    L.info('fetching all addresstypes');
    try {
      return await ProfileType.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IProfileType> {
    L.info(`fetching addresstype for id ${id}`);
    try {
      return await ProfileType.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IProfileType>): Promise<IProfileType> {
    L.info(`creating addresstype`);
    try {
      return await ProfileType.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(
    body: CreateQuery<IProfileType>,
    id: string
  ): Promise<IProfileType> {
    L.info(`updating addresstype for id ${id}`);
    try {
      return await ProfileType.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IProfileType> {
    L.info(`deleting addresstype for id ${id}`);
    try {
      return await ProfileType.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new ProfileTypeService();
