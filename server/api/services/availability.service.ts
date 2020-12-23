import { CreateQuery } from 'mongoose';
import Availability, { IAvailability } from './../models/availability';
import L from '../../common/logger';
export class AvailabilityService {
  async findAll(): Promise<IAvailability[]> {
    try {
      return await Availability.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IAvailability> {
    try {
      return await Availability.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IAvailability>): Promise<IAvailability> {
    try {
      return await Availability.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IAvailability>, id: string): Promise<IAvailability> {
    try {
      return await Availability.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IAvailability> {
    try {
      return await Availability.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new AvailabilityService();
