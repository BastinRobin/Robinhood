import { CreateQuery } from 'mongoose';
import additionalnotes, { IAdditionalnotes } from './../models/additionalnotes';
import L from '../../common/logger';
export class additionalnotesService {
  async findAll(): Promise<IAdditionalnotes[]> {
    try {
      return await additionalnotes.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IAdditionalnotes> {
    try {
      return await additionalnotes.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IAdditionalnotes>): Promise<IAdditionalnotes> {
    try {
      return await additionalnotes.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(
    body: CreateQuery<IAdditionalnotes>,
    id: string
  ): Promise<IAdditionalnotes> {
    try {
      return await additionalnotes.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IAdditionalnotes> {
    try {
      return await additionalnotes.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new additionalnotesService();
