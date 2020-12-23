import { CreateQuery } from 'mongoose';
import Rating, { IRating } from './../models/rating';
import L from '../../common/logger';
export class RatingService {
  async findAll(): Promise<IRating[]> {
    try {
      return await Rating.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IRating> {
    try {
      return await Rating.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IRating>): Promise<IRating> {
    try {
      return await Rating.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IRating>, id: string): Promise<IRating> {
    try {
      return await Rating.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IRating> {
    try {
      return await Rating.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new RatingService();
