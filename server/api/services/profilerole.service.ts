import { CreateQuery } from 'mongoose';
import profilerole, { IProfilerole } from './../models/profilerole';
import L from '../../common/logger';
export class profileroleService {
  async findAll(): Promise<IProfilerole[]> {
    try {
      return await profilerole.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IProfilerole> {
    try {
      return await profilerole.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IProfilerole>): Promise<IProfilerole> {
    try {
      return await profilerole.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(
    body: CreateQuery<IProfilerole>,
    id: string
  ): Promise<IProfilerole> {
    try {
      return await profilerole.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IProfilerole> {
    try {
      return await profilerole.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new profileroleService();
