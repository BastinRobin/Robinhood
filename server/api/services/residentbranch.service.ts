import { CreateQuery } from 'mongoose';
import residentbranch, { IResidentbranch } from './../models/residentbranch';
import L from '../../common/logger';
export class residentbranchService {
  async findAll(): Promise<IResidentbranch[]> {
    try {
      return await residentbranch.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IResidentbranch> {
    try {
      return await residentbranch.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IResidentbranch>): Promise<IResidentbranch> {
    try {
      return await residentbranch.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(
    body: CreateQuery<IResidentbranch>,
    id: string
  ): Promise<IResidentbranch> {
    try {
      return await residentbranch.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IResidentbranch> {
    try {
      return await residentbranch.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new residentbranchService();
