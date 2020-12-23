import { CreateQuery } from 'mongoose';
import branch, { IBranch } from './../models/branch';
import L from '../../common/logger';
export class branchService {
  async findAll(): Promise<IBranch[]> {
    try {
      return await branch.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IBranch> {
    try {
      return await branch.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IBranch>): Promise<IBranch> {
    try {
      return await branch.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IBranch>, id: string): Promise<IBranch> {
    try {
      return await branch.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IBranch> {
    try {
      return await branch.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new branchService();
