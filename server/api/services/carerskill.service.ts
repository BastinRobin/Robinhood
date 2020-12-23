import { CreateQuery } from 'mongoose';
import carerskill, { ICarerskill } from './../models/carerskill';
import L from '../../common/logger';
export class carerskillService {
  async findAll(): Promise<ICarerskill[]> {
    try {
      return await carerskill.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<ICarerskill> {
    try {
      return await carerskill.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<ICarerskill>): Promise<ICarerskill> {
    try {
      return await carerskill.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(
    body: CreateQuery<ICarerskill>,
    id: string
  ): Promise<ICarerskill> {
    try {
      return await carerskill.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<ICarerskill> {
    try {
      return await carerskill.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new carerskillService();
