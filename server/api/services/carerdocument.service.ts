import { CreateQuery } from 'mongoose';
import Carerdocument, { ICarerdocument } from './../models/carerdocument';
import L from '../../common/logger';
export class CarerdocumentService {
  async findAll(): Promise<ICarerdocument[]> {
    try {
      return await Carerdocument.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<ICarerdocument> {
    try {
      return await Carerdocument.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<ICarerdocument>): Promise<ICarerdocument> {
    try {
      return await Carerdocument.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<ICarerdocument>, id: string): Promise<ICarerdocument> {
    try {
      return await Carerdocument.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<ICarerdocument> {
    try {
      return await Carerdocument.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new CarerdocumentService();
