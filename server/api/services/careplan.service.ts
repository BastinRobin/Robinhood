import { CreateQuery } from 'mongoose';
import Careplan, { ICareplan } from './../models/careplan';
import L from '../../common/logger';
export class CareplanService {
  async findAll(): Promise<ICareplan[]> {
    try {
      return await Careplan.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<ICareplan> {
    try {
      return await Careplan.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<ICareplan>): Promise<ICareplan> {
    try {
      return await Careplan.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<ICareplan>, id: string): Promise<ICareplan> {
    try {
      return await Careplan.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<ICareplan> {
    try {
      return await Careplan.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new CareplanService();
