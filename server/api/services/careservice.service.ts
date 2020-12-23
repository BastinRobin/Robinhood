import { CreateQuery } from 'mongoose';
import Careservice, { ICareservice } from './../models/careservice';
import L from '../../common/logger';
export class CareserviceService {
  async findAll(): Promise<ICareservice[]> {
    try {
      return await Careservice.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<ICareservice> {
    try {
      return await Careservice.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<ICareservice>): Promise<ICareservice> {
    try {
      return await Careservice.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<ICareservice>, id: string): Promise<ICareservice> {
    try {
      return await Careservice.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<ICareservice> {
    try {
      return await Careservice.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new CareserviceService();
