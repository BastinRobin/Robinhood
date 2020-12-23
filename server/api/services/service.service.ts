import { CreateQuery } from 'mongoose';
import Service, { IService } from './../models/service';
import L from '../../common/logger';
export class ServiceService {
  async findAll(): Promise<IService[]> {
    try {
      return await Service.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IService> {
    try {
      return await Service.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IService>): Promise<IService> {
    try {
      return await Service.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IService>, id: string): Promise<IService> {
    try {
      return await Service.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IService> {
    try {
      return await Service.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new ServiceService();
