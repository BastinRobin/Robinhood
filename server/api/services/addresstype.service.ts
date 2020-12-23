import { CreateQuery } from 'mongoose';
import Addresstype, { IAddresstype } from './../models/addresstype';
import L from '../../common/logger';
export class AddresstypeService {
  async findAll(): Promise<IAddresstype[]> {
    try {
      return await Addresstype.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IAddresstype> {
    try {
      return await Addresstype.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IAddresstype>): Promise<IAddresstype> {
    try {
      return await Addresstype.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IAddresstype>, id: string): Promise<IAddresstype> {
    try {
      return await Addresstype.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IAddresstype> {
    try {
      return await Addresstype.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new AddresstypeService();
