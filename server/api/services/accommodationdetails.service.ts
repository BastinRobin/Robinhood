import { CreateQuery } from 'mongoose';
import accommodationdetails, {
  IAccommodationdetails,
} from './../models/accommodationdetails';
import L from '../../common/logger';
export class accommodationdetailsService {
  async findAll(): Promise<IAccommodationdetails[]> {
    try {
      return await accommodationdetails.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IAccommodationdetails> {
    try {
      return await accommodationdetails.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(
    body: CreateQuery<IAccommodationdetails>
  ): Promise<IAccommodationdetails> {
    try {
      return await accommodationdetails.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(
    body: CreateQuery<IAccommodationdetails>,
    id: string
  ): Promise<IAccommodationdetails> {
    try {
      return await accommodationdetails.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IAccommodationdetails> {
    try {
      return await accommodationdetails.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new accommodationdetailsService();
