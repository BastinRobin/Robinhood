import { CreateQuery } from 'mongoose';
import generalinfo, { IGeneralinfo } from './../models/generalinfo';
import L from '../../common/logger';
export class generalinfoService {
  async findAll(): Promise<IGeneralinfo[]> {
    try {
      return await generalinfo.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IGeneralinfo> {
    try {
      return await generalinfo.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IGeneralinfo>): Promise<IGeneralinfo> {
    try {
      return await generalinfo.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(
    body: CreateQuery<IGeneralinfo>,
    id: string
  ): Promise<IGeneralinfo> {
    try {
      return await generalinfo.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IGeneralinfo> {
    try {
      return await generalinfo.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new generalinfoService();
