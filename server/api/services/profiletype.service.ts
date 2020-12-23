import { CreateQuery } from 'mongoose';
import Profiletype, { IProfiletype } from './../models/profiletype';
import L from '../../common/logger';
export class ProfiletypeService {
  async findAll(): Promise<IProfiletype[]> {
    try {
      return await Profiletype.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IProfiletype> {
    try {
      return await Profiletype.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IProfiletype>): Promise<IProfiletype> {
    try {
      return await Profiletype.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(
    body: CreateQuery<IProfiletype>,
    id: string
  ): Promise<IProfiletype> {
    try {
      return await Profiletype.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IProfiletype> {
    try {
      return await Profiletype.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new ProfiletypeService();
