import { CreateQuery } from 'mongoose';
import Profiledocument, { IProfiledocument } from './../models/profiledocument';
import L from '../../common/logger';
export class ProfiledocumentService {
  async findAll(): Promise<IProfiledocument[]> {
    try {
      return await Profiledocument.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IProfiledocument> {
    try {
      return await Profiledocument.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IProfiledocument>): Promise<IProfiledocument> {
    try {
      return await Profiledocument.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IProfiledocument>, id: string): Promise<IProfiledocument> {
    try {
      return await Profiledocument.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IProfiledocument> {
    try {
      return await Profiledocument.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new ProfiledocumentService();
