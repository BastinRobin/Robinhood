import { CreateQuery } from 'mongoose';
import Residentdocument, {
  IResidentdocument,
} from './../models/residentdocument';
import L from '../../common/logger';
export class ResidentdocumentService {
  async findAll(): Promise<IResidentdocument[]> {
    try {
      return await Residentdocument.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IResidentdocument> {
    try {
      return await Residentdocument.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(
    body: CreateQuery<IResidentdocument>
  ): Promise<IResidentdocument> {
    try {
      return await Residentdocument.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(
    body: CreateQuery<IResidentdocument>,
    id: string
  ): Promise<IResidentdocument> {
    try {
      return await Residentdocument.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IResidentdocument> {
    try {
      return await Residentdocument.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new ResidentdocumentService();
