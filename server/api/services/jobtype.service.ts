import { CreateQuery } from 'mongoose';
import Jobtype, { IJobtype } from './../models/jobtype';
import L from '../../common/logger';
export class JobtypeService {
  async findAll(): Promise<IJobtype[]> {
    try {
      return await Jobtype.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IJobtype> {
    try {
      return await Jobtype.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IJobtype>): Promise<IJobtype> {
    try {
      return await Jobtype.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IJobtype>, id: string): Promise<IJobtype> {
    try {
      return await Jobtype.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IJobtype> {
    try {
      return await Jobtype.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new JobtypeService();
