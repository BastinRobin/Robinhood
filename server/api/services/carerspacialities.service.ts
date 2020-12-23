import { CreateQuery } from 'mongoose';
import carerspacialities, {
  ICarerspacialities,
} from './../models/carerspacialities';
import L from '../../common/logger';
export class carerspacialitiesService {
  async findAll(): Promise<ICarerspacialities[]> {
    try {
      return await carerspacialities.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<ICarerspacialities> {
    try {
      return await carerspacialities.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(
    body: CreateQuery<ICarerspacialities>
  ): Promise<ICarerspacialities> {
    try {
      return await carerspacialities.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(
    body: CreateQuery<ICarerspacialities>,
    id: string
  ): Promise<ICarerspacialities> {
    try {
      return await carerspacialities.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<ICarerspacialities> {
    try {
      return await carerspacialities.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new carerspacialitiesService();
