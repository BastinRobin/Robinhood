import { CreateQuery } from 'mongoose';
import Example, { IExample } from './model';
import L from '../../../common/logger';
export class ExampleService {
  async findAll(): Promise<IExample[]> {
    try {
      return await Example.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IExample> {
    try {
      return await Example.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IExample>): Promise<IExample> {
    try {
      return await Example.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IExample>, id: string): Promise<IExample> {
    try {
      return await Example.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IExample> {
    try {
      return await Example.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteAll(): Promise<IExample> {
    try {
      return await Example.deleteMany();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async count(): Promise<IExample> {
    try {
      return await Example.countDocuments();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new ExampleService();
