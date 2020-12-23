import { CreateQuery } from 'mongoose';
import Careplandetails, { ICareplandetails } from './../models/careplandetails';
import L from '../../common/logger';
export class CareplandetailsService {
  async findAll(): Promise<ICareplandetails[]> {
    try {
      return await Careplandetails.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<ICareplandetails> {
    try {
      return await Careplandetails.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<ICareplandetails>): Promise<ICareplandetails> {
    try {
      return await Careplandetails.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<ICareplandetails>, id: string): Promise<ICareplandetails> {
    try {
      return await Careplandetails.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<ICareplandetails> {
    try {
      return await Careplandetails.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new CareplandetailsService();
