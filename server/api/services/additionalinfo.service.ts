import { CreateQuery } from 'mongoose';
import Additionalinfo, { IAdditionalinfo } from './../models/additionalinfo';
import L from '../../common/logger';
export class AdditionalinfoService {
  async findAll(): Promise<IAdditionalinfo[]> {
    try {
      return await Additionalinfo.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IAdditionalinfo> {
    try {
      return await Additionalinfo.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IAdditionalinfo>): Promise<IAdditionalinfo> {
    try {
      return await Additionalinfo.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IAdditionalinfo>, id: string): Promise<IAdditionalinfo> {
    try {
      return await Additionalinfo.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IAdditionalinfo> {
    try {
      return await Additionalinfo.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new AdditionalinfoService();
