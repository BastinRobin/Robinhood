import { CreateQuery } from 'mongoose';
import Country, { ICountry } from './../models/country';
import L from '../../common/logger';
export class CountryService {
  async findAll(): Promise<ICountry[]> {
    try {
      return await Country.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<ICountry> {
    try {
      return await Country.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<ICountry>): Promise<ICountry> {
    try {
      return await Country.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<ICountry>, id: string): Promise<ICountry> {
    try {
      return await Country.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<ICountry> {
    try {
      return await Country.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new CountryService();
